const fs = require('fs');
const path = require('path');

// Mock DOM environment
global.document = {
  createElement: jest.fn(() => ({
    style: {},
    appendChild: jest.fn(),
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeChild: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  })),
  getElementById: jest.fn(() => ({
    style: {},
    appendChild: jest.fn(),
    removeChild: jest.fn()
  })),
  getElementsByTagName: jest.fn(() => []),
  body: {
    appendChild: jest.fn()
  }
};

// Load the popup module
const popupCode = fs.readFileSync(path.join(__dirname, '../../socialcalcpopup.js'), 'utf8');
eval(popupCode);

describe('SocialCalc.Popup', () => {
  beforeEach(() => {
    // Reset popup state
    if (global.SocialCalc && global.SocialCalc.Popup) {
      global.SocialCalc.Popup.Controls = {};
      global.SocialCalc.Popup.Current = {};
    }
  });

  describe('Popup namespace', () => {
    it('should exist as an object', () => {
      expect(typeof SocialCalc.Popup).toBe('object');
      expect(SocialCalc.Popup).not.toBeNull();
    });

    it('should have Types object', () => {
      expect(typeof SocialCalc.Popup.Types).toBe('object');
    });

    it('should have Controls object', () => {
      expect(typeof SocialCalc.Popup.Controls).toBe('object');
    });

    it('should have Current object', () => {
      expect(typeof SocialCalc.Popup.Current).toBe('object');
    });
  });

  describe('Configuration', () => {
    it('should have imagePrefix defined', () => {
      expect(SocialCalc.Popup.imagePrefix).toBeDefined();
      expect(typeof SocialCalc.Popup.imagePrefix).toBe('string');
      expect(SocialCalc.Popup.imagePrefix).toBe('images/sc-');
    });

    it('should have LocalizeString function', () => {
      expect(typeof SocialCalc.Popup.LocalizeString).toBe('function');
    });

    it('should return input string by default in LocalizeString', () => {
      const testString = 'Test String';
      const result = SocialCalc.Popup.LocalizeString(testString);
      expect(result).toBe(testString);
    });
  });

  describe('Create function', () => {
    it('should be defined', () => {
      expect(typeof SocialCalc.Popup.Create).toBe('function');
    });

    it('should handle unknown type gracefully', () => {
      expect(() => {
        SocialCalc.Popup.Create('unknowntype', 'testid', {});
      }).not.toThrow();
    });

    it('should call type-specific Create function if available', () => {
      const mockCreate = jest.fn();
      SocialCalc.Popup.Types['testtype'] = {
        Create: mockCreate
      };

      SocialCalc.Popup.Create('testtype', 'testid', { test: 'value' });
      
      expect(mockCreate).toHaveBeenCalledWith('testtype', 'testid', { test: 'value' });
    });
  });

  describe('SetValue function', () => {
    it('should be defined', () => {
      expect(typeof SocialCalc.Popup.SetValue).toBe('function');
    });

    it('should handle unknown control gracefully', () => {
      expect(() => {
        SocialCalc.Popup.SetValue('unknownid', 'value');
      }).not.toThrow();
    });

    it('should call type-specific SetValue function if available', () => {
      const mockSetValue = jest.fn();
      SocialCalc.Popup.Types['testtype'] = {
        SetValue: mockSetValue
      };
      SocialCalc.Popup.Controls['testid'] = {
        type: 'testtype'
      };

      SocialCalc.Popup.SetValue('testid', 'testvalue');
      
      expect(mockSetValue).toHaveBeenCalledWith('testtype', 'testid', 'testvalue');
    });
  });

  describe('GetValue function', () => {
    it('should be defined', () => {
      expect(typeof SocialCalc.Popup.GetValue).toBe('function');
    });

    it('should return empty string for unknown control', () => {
      const result = SocialCalc.Popup.GetValue('unknownid');
      expect(result).toBe('');
    });

    it('should call type-specific GetValue function if available', () => {
      const mockGetValue = jest.fn().mockReturnValue('testreturn');
      SocialCalc.Popup.Types['testtype'] = {
        GetValue: mockGetValue
      };
      SocialCalc.Popup.Controls['testid'] = {
        type: 'testtype'
      };

      const result = SocialCalc.Popup.GetValue('testid');
      
      expect(mockGetValue).toHaveBeenCalledWith('testtype', 'testid');
      expect(result).toBe('testreturn');
    });
  });

  describe('SetDisabled function', () => {
    it('should be defined', () => {
      expect(typeof SocialCalc.Popup.SetDisabled).toBe('function');
    });

    it('should handle unknown control gracefully', () => {
      expect(() => {
        SocialCalc.Popup.SetDisabled('unknownid', true);
      }).not.toThrow();
    });

    it('should call type-specific SetDisabled function if available', () => {
      const mockSetDisabled = jest.fn();
      SocialCalc.Popup.Types['testtype'] = {
        SetDisabled: mockSetDisabled
      };
      SocialCalc.Popup.Controls['testid'] = {
        type: 'testtype'
      };

      SocialCalc.Popup.SetDisabled('testid', true);
      
      expect(mockSetDisabled).toHaveBeenCalledWith('testtype', 'testid', true);
    });
  });

  describe('Show and Hide functions', () => {
    it('should have Show function defined', () => {
      expect(typeof SocialCalc.Popup.Show).toBe('function');
    });

    it('should have Hide function defined', () => {
      expect(typeof SocialCalc.Popup.Hide).toBe('function');
    });

    it('should handle Show with unknown control gracefully', () => {
      expect(() => {
        SocialCalc.Popup.Show('unknownid');
      }).not.toThrow();
    });

    it('should handle Hide with unknown control gracefully', () => {
      expect(() => {
        SocialCalc.Popup.Hide('unknownid');
      }).not.toThrow();
    });
  });

  describe('Control registration', () => {
    it('should allow registering new control types', () => {
      const testType = {
        Create: jest.fn(),
        SetValue: jest.fn(),
        GetValue: jest.fn()
      };

      SocialCalc.Popup.Types['newtype'] = testType;
      
      expect(SocialCalc.Popup.Types['newtype']).toBe(testType);
    });

    it('should allow registering control instances', () => {
      const testControl = {
        type: 'testtype',
        value: 'testvalue',
        data: {}
      };

      SocialCalc.Popup.Controls['newcontrol'] = testControl;
      
      expect(SocialCalc.Popup.Controls['newcontrol']).toBe(testControl);
    });
  });

  describe('Current state management', () => {
    it('should track current control', () => {
      SocialCalc.Popup.Current.id = 'testid';
      expect(SocialCalc.Popup.Current.id).toBe('testid');
    });

    it('should allow clearing current control', () => {
      SocialCalc.Popup.Current.id = null;
      expect(SocialCalc.Popup.Current.id).toBeNull();
    });
  });
});