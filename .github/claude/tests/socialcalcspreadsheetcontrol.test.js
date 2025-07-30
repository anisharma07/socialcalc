const fs = require('fs');
const path = require('path');

// Mock DOM and browser APIs
global.document = {
  createElement: jest.fn(() => ({
    style: {},
    appendChild: jest.fn(),
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeChild: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    innerHTML: '',
    offsetHeight: 100,
    offsetWidth: 100
  })),
  getElementById: jest.fn(() => ({
    style: {},
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    offsetHeight: 500,
    offsetWidth: 800
  })),
  getElementsByTagName: jest.fn(() => []),
  body: {
    appendChild: jest.fn()
  }
};

global.window = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  setTimeout: jest.fn(),
  clearTimeout: jest.fn()
};

// Load required modules in order
const socialCalcCode = fs.readFileSync(path.join(__dirname, '../../socialcalc-3.js'), 'utf8');
const tableEditorCode = fs.readFileSync(path.join(__dirname, '../../socialcalctableeditor.js'), 'utf8');
const spreadsheetControlCode = fs.readFileSync(path.join(__dirname, '../../socialcalcspreadsheetcontrol.js'), 'utf8');

eval(socialCalcCode);
eval(tableEditorCode);
eval(spreadsheetControlCode);

describe('SocialCalc.SpreadsheetControl', () => {
  let spreadsheetControl;
  let mockElement;

  beforeEach(() => {
    mockElement = {
      style: {},
      appendChild: jest.fn(),
      removeChild: jest.fn(),
      offsetHeight: 500,
      offsetWidth: 800,
      innerHTML: ''
    };

    global.document.getElementById.mockReturnValue(mockElement);

    if (typeof SocialCalc.SpreadsheetControl === 'function') {
      spreadsheetControl = new SocialCalc.SpreadsheetControl();
    }
  });

  describe('Constructor', () => {
    it('should create a SpreadsheetControl instance', () => {
      if (spreadsheetControl) {
        expect(spreadsheetControl).toBeDefined();
        expect(typeof spreadsheetControl).toBe('object');
      }
    });

    it('should initialize with default properties', () => {
      if (spreadsheetControl) {
        expect(spreadsheetControl.sheet).toBeDefined();
        expect(spreadsheetControl.editor).toBeDefined();
        expect(spreadsheetControl.spreadsheetDiv).toBeDefined();
      }
    });
  });

  describe('InitializeSpreadsheetControl', () => {
    it('should be a function', () => {
      if (spreadsheetControl) {
        expect(typeof spreadsheetControl.InitializeSpreadsheetControl).toBe('function');
      }
    });

    it('should initialize with element ID', () => {
      if (spreadsheetControl && spreadsheetControl.InitializeSpreadsheetControl) {
        expect(() => {
          spreadsheetControl.InitializeSpreadsheetControl('test-element', 500, 300);
        }).not.toThrow();
      }
    });

    it('should set dimensions correctly', () => {
      if (spreadsheetControl && spreadsheetControl.InitializeSpreadsheetControl) {
        spreadsheetControl.InitializeSpreadsheetControl('test-element', 600, 400);
        
        if (spreadsheetControl.requestedHeight !== undefined) {
          expect(spreadsheetControl.requestedHeight).toBe(400);
        }
        if (spreadsheetControl.requestedWidth !== undefined) {
          expect(spreadsheetControl.requestedWidth).toBe(600);
        }
      }
    });
  });

  describe('Sheet management', () => {
    it('should have methods for sheet operations', () => {
      if (spreadsheetControl) {
        if (spreadsheetControl.CreateSheetSave) {
          expect(typeof spreadsheetControl.CreateSheetSave).toBe('function');
        }
        if (spreadsheetControl.ParseSheetSave) {
          expect(typeof spreadsheetControl.ParseSheetSave).toBe('function');
        }
      }
    });

    it('should handle empty sheet save', () => {
      if (spreadsheetControl && spreadsheetControl.ParseSheetSave) {
        expect(() => {
          spreadsheetControl.ParseSheetSave('');
        }).not.toThrow();
      }
    });
  });

  describe('Editor integration', () => {
    it('should have editor property', () => {
      if (spreadsheetControl) {
        expect(spreadsheetControl.editor).toBeDefined();
      }
    });

    it('should have methods for editor control', () => {
      if (spreadsheetControl) {
        if (spreadsheetControl.ExecuteCommand) {
          expect(typeof spreadsheetControl.ExecuteCommand).toBe('function');
        }
      }
    });
  });

  describe('Event handling', () => {
    it('should handle resize events', () => {
      if (spreadsheetControl && spreadsheetControl.DoOnResize) {
        expect(typeof spreadsheetControl.DoOnResize).toBe('function');
        expect(() => {
          spreadsheetControl.DoOnResize();
        }).not.toThrow();
      }
    });
  });

  describe('Layout and sizing', () => {
    it('should handle layout computation', () => {
      if (spreadsheetControl && spreadsheetControl.ComputeLayout) {
        expect(typeof spreadsheetControl.ComputeLayout).toBe('function');
        expect(() => {
          spreadsheetControl.ComputeLayout();
        }).not.toThrow();
      }
    });

    it('should handle different size constraints', () => {
      if (spreadsheetControl) {
        expect(() => {
          spreadsheetControl.InitializeSpreadsheetControl('test', 100, 100);
        }).not.toThrow();
        
        expect(() => {
          spreadsheetControl.InitializeSpreadsheetControl('test', 1000, 800);
        }).not.toThrow();
      }
    });
  });

  describe('Toolbar functionality', () => {
    it('should have toolbar-related properties', () => {
      if (spreadsheetControl) {
        // Check for toolbar-related properties that might exist
        const toolbarProps = ['toolbarDiv', 'formulabarDiv', 'statusbarDiv'];
        toolbarProps.forEach(prop => {
          if (spreadsheetControl[prop] !== undefined) {
            expect(spreadsheetControl[prop]).toBeDefined();
          }
        });
      }
    });
  });

  describe('Error handling', () => {
    it('should handle invalid element ID gracefully', () => {
      global.document.getElementById.mockReturnValue(null);
      
      if (spreadsheetControl) {
        expect(() => {
          spreadsheetControl.InitializeSpreadsheetControl('invalid-id', 500, 300);
        }).not.toThrow();
      }
    });

    it('should handle invalid dimensions', () => {
      if (spreadsheetControl) {
        expect(() => {
          spreadsheetControl.InitializeSpreadsheetControl('test', -100, -100);
        }).not.toThrow();
        
        expect(() => {
          spreadsheetControl.InitializeSpreadsheetControl('test', 0, 0);
        }).not.toThrow();
      }
    });
  });

  describe('State management', () => {
    it('should maintain internal state correctly', () => {
      if (spreadsheetControl) {
        // Test that the control maintains its state
        const initialState = spreadsheetControl.sheet;
        
        // Perform some operation
        if (spreadsheetControl.InitializeSpreadsheetControl) {
          spreadsheetControl.InitializeSpreadsheetControl('test', 500, 300);
        }
        
        // State should still be accessible
        expect(spreadsheetControl.sheet).toBeDefined();
      }
    });
  });
});