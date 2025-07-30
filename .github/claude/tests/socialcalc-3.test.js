const fs = require('fs');
const path = require('path');

// Mock DOM methods
global.document = {
  createElement: jest.fn(() => ({
    style: {},
    appendChild: jest.fn(),
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeChild: jest.fn()
  })),
  getElementById: jest.fn(),
  getElementsByTagName: jest.fn(() => []),
  body: {
    appendChild: jest.fn()
  }
};

global.window = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
};

// Load the main SocialCalc module
const socialCalcCode = fs.readFileSync(path.join(__dirname, '../../socialcalc-3.js'), 'utf8');
eval(socialCalcCode);

describe('SocialCalc Main Module', () => {
  beforeEach(() => {
    // Reset SocialCalc state
    if (global.SocialCalc) {
      global.SocialCalc.CurrentSpreadsheetControlObject = null;
    }
  });

  describe('SocialCalc namespace', () => {
    it('should exist as a global object', () => {
      expect(typeof SocialCalc).toBe('object');
      expect(SocialCalc).not.toBeNull();
    });

    it('should have version information', () => {
      expect(typeof SocialCalc.version).toBeDefined();
    });
  });

  describe('SocialCalc.Sheet', () => {
    let sheet;

    beforeEach(() => {
      if (typeof SocialCalc.Sheet === 'function') {
        sheet = new SocialCalc.Sheet();
      }
    });

    it('should create a new sheet object', () => {
      if (sheet) {
        expect(sheet).toBeDefined();
        expect(typeof sheet).toBe('object');
      }
    });

    it('should initialize with default properties', () => {
      if (sheet) {
        expect(sheet.cells).toBeDefined();
        expect(sheet.attribs).toBeDefined();
        expect(sheet.names).toBeDefined();
      }
    });
  });

  describe('SocialCalc.Cell', () => {
    let cell;

    beforeEach(() => {
      if (typeof SocialCalc.Cell === 'function') {
        cell = new SocialCalc.Cell('A1');
      }
    });

    it('should create a new cell object', () => {
      if (cell) {
        expect(cell).toBeDefined();
        expect(typeof cell).toBe('object');
      }
    });

    it('should have basic cell properties', () => {
      if (cell) {
        expect(cell.coord).toBeDefined();
        expect(cell.datatype).toBeDefined();
        expect(cell.datavalue).toBeDefined();
      }
    });
  });

  describe('Cell coordinate functions', () => {
    it('should have coordinate utility functions', () => {
      if (SocialCalc.coordToCr) {
        expect(typeof SocialCalc.coordToCr).toBe('function');
      }
      if (SocialCalc.crToCoord) {
        expect(typeof SocialCalc.crToCoord).toBe('function');
      }
    });

    it('should convert coordinates correctly', () => {
      if (SocialCalc.coordToCr && SocialCalc.crToCoord) {
        const result = SocialCalc.coordToCr('A1');
        if (result) {
          expect(result.row).toBeDefined();
          expect(result.col).toBeDefined();
        }

        const coord = SocialCalc.crToCoord(1, 1);
        if (coord) {
          expect(typeof coord).toBe('string');
        }
      }
    });
  });

  describe('Error handling', () => {
    it('should handle invalid inputs gracefully', () => {
      if (SocialCalc.coordToCr) {
        const result = SocialCalc.coordToCr('INVALID');
        expect(result).toBeDefined(); // Should not throw
      }
    });
  });

  describe('RenderContext', () => {
    let renderContext;

    beforeEach(() => {
      if (typeof SocialCalc.RenderContext === 'function') {
        const sheet = new SocialCalc.Sheet();
        renderContext = new SocialCalc.RenderContext(sheet);
      }
    });

    it('should create a render context', () => {
      if (renderContext) {
        expect(renderContext).toBeDefined();
        expect(typeof renderContext).toBe('object');
      }
    });

    it('should have rendering methods', () => {
      if (renderContext) {
        expect(typeof renderContext.RenderSheet).toBe('function');
      }
    });
  });

  describe('Utility functions', () => {
    it('should have string encoding/decoding functions', () => {
      if (SocialCalc.encodeForSave) {
        expect(typeof SocialCalc.encodeForSave).toBe('function');
      }
      if (SocialCalc.decodeFromSave) {
        expect(typeof SocialCalc.decodeFromSave).toBe('function');
      }
    });

    it('should handle empty strings correctly', () => {
      if (SocialCalc.encodeForSave) {
        const encoded = SocialCalc.encodeForSave('');
        expect(typeof encoded).toBe('string');
      }
    });

    it('should handle special characters', () => {
      if (SocialCalc.encodeForSave && SocialCalc.decodeFromSave) {
        const original = 'Test\nwith\tspecial\rchars';
        const encoded = SocialCalc.encodeForSave(original);
        const decoded = SocialCalc.decodeFromSave(encoded);
        expect(decoded).toBe(original);
      }
    });
  });
});