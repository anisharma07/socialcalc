const fs = require('fs');
const path = require('path');

// Load the constants module
const constantsCode = fs.readFileSync(path.join(__dirname, '../../socialcalcconstants.js'), 'utf8');
eval(constantsCode);

describe('SocialCalc.Constants', () => {
  it('should exist as an object', () => {
    expect(typeof SocialCalc.Constants).toBe('object');
    expect(SocialCalc.Constants).not.toBeNull();
  });

  describe('Common Constants', () => {
    it('should have textdatadefaulttype defined', () => {
      expect(SocialCalc.Constants.textdatadefaulttype).toBeDefined();
      expect(typeof SocialCalc.Constants.textdatadefaulttype).toBe('string');
    });
  });

  describe('Error messages', () => {
    it('should have browser not supported message', () => {
      expect(SocialCalc.Constants.s_BrowserNotSupported).toBeDefined();
      expect(typeof SocialCalc.Constants.s_BrowserNotSupported).toBe('string');
      expect(SocialCalc.Constants.s_BrowserNotSupported.length).toBeGreaterThan(0);
    });

    it('should have internal error message', () => {
      expect(SocialCalc.Constants.s_InternalError).toBeDefined();
      expect(typeof SocialCalc.Constants.s_InternalError).toBe('string');
      expect(SocialCalc.Constants.s_InternalError.length).toBeGreaterThan(0);
    });
  });

  describe('Parse error messages', () => {
    it('should have unknown column type error', () => {
      expect(SocialCalc.Constants.s_pssUnknownColType).toBeDefined();
      expect(typeof SocialCalc.Constants.s_pssUnknownColType).toBe('string');
    });

    it('should have unknown row type error', () => {
      expect(SocialCalc.Constants.s_pssUnknownRowType).toBeDefined();
      expect(typeof SocialCalc.Constants.s_pssUnknownRowType).toBe('string');
    });

    it('should have unknown line type error', () => {
      expect(SocialCalc.Constants.s_pssUnknownLineType).toBeDefined();
      expect(typeof SocialCalc.Constants.s_pssUnknownLineType).toBe('string');
    });
  });

  describe('Cell parsing errors', () => {
    it('should have unknown cell type error', () => {
      expect(SocialCalc.Constants.s_cfspUnknownCellType).toBeDefined();
      expect(typeof SocialCalc.Constants.s_cfspUnknownCellType).toBe('string');
    });
  });

  describe('String constants starting with s_', () => {
    const stringConstants = Object.keys(SocialCalc.Constants).filter(key => key.startsWith('s_'));
    
    it('should have multiple string constants for localization', () => {
      expect(stringConstants.length).toBeGreaterThan(0);
    });

    it('should have all string constants as strings', () => {
      stringConstants.forEach(key => {
        expect(typeof SocialCalc.Constants[key]).toBe('string');
        expect(SocialCalc.Constants[key].length).toBeGreaterThan(0);
      });
    });
  });

  describe('Non-string constants', () => {
    const nonStringKeys = Object.keys(SocialCalc.Constants).filter(key => !key.startsWith('s_'));
    
    it('should have configuration constants', () => {
      expect(nonStringKeys.length).toBeGreaterThan(0);
    });

    it('should have textdatadefaulttype as expected value', () => {
      expect(SocialCalc.Constants.textdatadefaulttype).toBe('t');
    });
  });

  describe('Constants integrity', () => {
    it('should not have null or undefined values', () => {
      Object.keys(SocialCalc.Constants).forEach(key => {
        expect(SocialCalc.Constants[key]).not.toBeNull();
        expect(SocialCalc.Constants[key]).not.toBeUndefined();
      });
    });

    it('should have consistent naming convention for error messages', () => {
      const errorKeys = Object.keys(SocialCalc.Constants).filter(key => 
        key.includes('Error') || key.includes('Unknown') || key.includes('NotSupported')
      );
      
      errorKeys.forEach(key => {
        expect(key).toMatch(/^s_/);
      });
    });
  });

  describe('Tooltip constants', () => {
    it('should handle tooltip offset constants if they exist', () => {
      if (SocialCalc.Constants.TooltipOffsetX !== undefined) {
        expect(typeof SocialCalc.Constants.TooltipOffsetX).toBe('number');
      }
      if (SocialCalc.Constants.TooltipOffsetY !== undefined) {
        expect(typeof SocialCalc.Constants.TooltipOffsetY).toBe('number');
      }
    });
  });
});