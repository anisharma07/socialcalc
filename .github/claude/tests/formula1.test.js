const fs = require('fs');
const path = require('path');

// Load the SocialCalc modules
const formulaCode = fs.readFileSync(path.join(__dirname, '../../formula1.js'), 'utf8');
eval(formulaCode);

describe('SocialCalc.Formula', () => {
  beforeEach(() => {
    // Ensure SocialCalc namespace exists
    if (!global.SocialCalc) {
      global.SocialCalc = {};
    }
    if (!global.SocialCalc.Constants) {
      global.SocialCalc.Constants = {};
    }
  });

  describe('ParseState constants', () => {
    it('should have correct parse state values', () => {
      expect(SocialCalc.Formula.ParseState.num).toBe(1);
      expect(SocialCalc.Formula.ParseState.alpha).toBe(2);
      expect(SocialCalc.Formula.ParseState.coord).toBe(3);
      expect(SocialCalc.Formula.ParseState.string).toBe(4);
    });
  });

  describe('TokenType constants', () => {
    it('should have correct token type values', () => {
      expect(SocialCalc.Formula.TokenType.num).toBe(1);
      expect(SocialCalc.Formula.TokenType.coord).toBe(2);
      expect(SocialCalc.Formula.TokenType.op).toBe(3);
      expect(SocialCalc.Formula.TokenType.name).toBe(4);
    });
  });

  describe('CharClass constants', () => {
    it('should have correct character class values', () => {
      expect(SocialCalc.Formula.CharClass.num).toBe(1);
      expect(SocialCalc.Formula.CharClass.alpha).toBe(5);
      expect(SocialCalc.Formula.CharClass.op).toBe(3);
    });
  });

  describe('CharClassTable', () => {
    it('should correctly classify numeric characters', () => {
      expect(SocialCalc.Formula.CharClassTable['0']).toBe(1);
      expect(SocialCalc.Formula.CharClassTable['9']).toBe(1);
      expect(SocialCalc.Formula.CharClassTable['.']).toBe(2);
    });

    it('should correctly classify alphabetic characters', () => {
      expect(SocialCalc.Formula.CharClassTable['A']).toBe(5);
      expect(SocialCalc.Formula.CharClassTable['Z']).toBe(5);
      expect(SocialCalc.Formula.CharClassTable['a']).toBe(5);
      expect(SocialCalc.Formula.CharClassTable['z']).toBe(5);
    });

    it('should correctly classify operators', () => {
      expect(SocialCalc.Formula.CharClassTable['+']).toBe(3);
      expect(SocialCalc.Formula.CharClassTable['-']).toBe(3);
      expect(SocialCalc.Formula.CharClassTable['*']).toBe(3);
      expect(SocialCalc.Formula.CharClassTable['/']).toBe(3);
    });

    it('should correctly classify special characters', () => {
      expect(SocialCalc.Formula.CharClassTable['"']).toBe(8);
      expect(SocialCalc.Formula.CharClassTable[' ']).toBe(9);
      expect(SocialCalc.Formula.CharClassTable['$']).toBe(6);
    });
  });

  describe('UpperCaseTable', () => {
    it('should correctly map lowercase to uppercase', () => {
      expect(SocialCalc.Formula.UpperCaseTable['a']).toBe('A');
      expect(SocialCalc.Formula.UpperCaseTable['z']).toBe('Z');
      expect(SocialCalc.Formula.UpperCaseTable['m']).toBe('M');
    });
  });

  describe('SpecialConstants', () => {
    it('should have error constants defined', () => {
      expect(SocialCalc.Formula.SpecialConstants['#NULL!']).toBe('0,e#NULL!');
      expect(SocialCalc.Formula.SpecialConstants['#NUM!']).toBe('0,e#NUM!');
      expect(SocialCalc.Formula.SpecialConstants['#DIV/0!']).toBe('0,e#DIV/0!');
      expect(SocialCalc.Formula.SpecialConstants['#VALUE!']).toBe('0,e#VALUE!');
      expect(SocialCalc.Formula.SpecialConstants['#REF!']).toBe('0,e#REF!');
      expect(SocialCalc.Formula.SpecialConstants['#NAME?']).toBe('0,e#NAME?');
    });
  });

  describe('TokenPrecedence', () => {
    it('should have correct operator precedence', () => {
      expect(SocialCalc.Formula.TokenPrecedence['!']).toBe(1);
      expect(SocialCalc.Formula.TokenPrecedence[':']).toBe(2);
      expect(SocialCalc.Formula.TokenPrecedence[',']).toBe(2);
      expect(SocialCalc.Formula.TokenPrecedence['%']).toBe(4);
      expect(SocialCalc.Formula.TokenPrecedence['^']).toBe(5);
    });

    it('should have right associative operators with negative precedence', () => {
      expect(SocialCalc.Formula.TokenPrecedence['M']).toBe(-3);
      expect(SocialCalc.Formula.TokenPrecedence['P']).toBe(-3);
    });
  });

  describe('TokenOpExpansion', () => {
    it('should correctly expand operator tokens', () => {
      expect(SocialCalc.Formula.TokenOpExpansion['G']).toBe('>=');
      expect(SocialCalc.Formula.TokenOpExpansion['L']).toBe('<=');
      expect(SocialCalc.Formula.TokenOpExpansion['M']).toBe('-');
      expect(SocialCalc.Formula.TokenOpExpansion['N']).toBe('<>');
      expect(SocialCalc.Formula.TokenOpExpansion['P']).toBe('+');
    });
  });

  describe('Formula parsing edge cases', () => {
    it('should handle invalid character classes gracefully', () => {
      const invalidChar = String.fromCharCode(256);
      expect(SocialCalc.Formula.CharClassTable[invalidChar]).toBeUndefined();
    });

    it('should handle all defined operator precedences', () => {
      const operators = Object.keys(SocialCalc.Formula.TokenPrecedence);
      operators.forEach(op => {
        expect(typeof SocialCalc.Formula.TokenPrecedence[op]).toBe('number');
      });
    });
  });
});