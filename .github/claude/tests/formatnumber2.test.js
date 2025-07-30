const fs = require('fs');
const path = require('path');

// Load the SocialCalc modules
const formatNumberCode = fs.readFileSync(path.join(__dirname, '../../formatnumber2.js'), 'utf8');
eval(formatNumberCode);

describe('SocialCalc.FormatNumber', () => {
  beforeEach(() => {
    // Reset format definitions before each test
    if (global.SocialCalc && global.SocialCalc.FormatNumber) {
      global.SocialCalc.FormatNumber.format_definitions = {};
    }
  });

  describe('formatNumberWithFormat', () => {
    it('should format a positive number correctly', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(123.45, '#,##0.00', '$');
      expect(result).toContain('123.45');
    });

    it('should format a negative number correctly', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(-123.45, '#,##0.00', '$');
      expect(result).toContain('123.45');
    });

    it('should handle zero values', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(0, '#,##0.00', '$');
      expect(result).toContain('0.00');
    });

    it('should handle very large numbers', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(1234567.89, '#,##0.00', '$');
      expect(result).toContain('1,234,567.89');
    });

    it('should handle very small numbers', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(0.001, '0.000', '$');
      expect(result).toContain('0.001');
    });

    it('should return NaN for invalid input', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(NaN, '#,##0.00', '$');
      expect(result).toBe('NaN');
    });

    it('should handle infinity values', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(Infinity, '#,##0.00', '$');
      expect(result).toBe('NaN');
    });

    it('should format currency correctly', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(1000, '$#,##0.00', '$');
      expect(result).toContain('1,000.00');
    });

    it('should format percentages correctly', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(0.25, '0.00%', '$');
      expect(result).toContain('25.00');
    });

    it('should handle date formatting', () => {
      const dateValue = 44197; // Excel date serial for 2021-01-01
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(dateValue, 'mm/dd/yyyy', '$');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('constants', () => {
    it('should have correct separator and decimal characters', () => {
      expect(SocialCalc.FormatNumber.separatorchar).toBe(',');
      expect(SocialCalc.FormatNumber.decimalchar).toBe('.');
    });

    it('should have correct day names', () => {
      expect(SocialCalc.FormatNumber.daynames).toHaveLength(7);
      expect(SocialCalc.FormatNumber.daynames[0]).toBe('Sunday');
      expect(SocialCalc.FormatNumber.daynames[6]).toBe('Saturday');
    });

    it('should have correct month names', () => {
      expect(SocialCalc.FormatNumber.monthnames).toHaveLength(12);
      expect(SocialCalc.FormatNumber.monthnames[0]).toBe('January');
      expect(SocialCalc.FormatNumber.monthnames[11]).toBe('December');
    });

    it('should have allowed colors defined', () => {
      expect(SocialCalc.FormatNumber.allowedcolors.BLACK).toBe('#000000');
      expect(SocialCalc.FormatNumber.allowedcolors.WHITE).toBe('#FFFFFF');
      expect(SocialCalc.FormatNumber.allowedcolors.RED).toBe('#FF0000');
    });
  });

  describe('edge cases', () => {
    it('should handle string input that can be converted to number', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat('123.45', '#,##0.00', '$');
      expect(result).toContain('123.45');
    });

    it('should handle null input', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(null, '#,##0.00', '$');
      expect(result).toContain('0.00');
    });

    it('should handle undefined input', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(undefined, '#,##0.00', '$');
      expect(result).toBe('NaN');
    });

    it('should handle empty format string', () => {
      const result = SocialCalc.FormatNumber.formatNumberWithFormat(123.45, '', '$');
      expect(typeof result).toBe('string');
    });
  });
});