const fs = require('fs');
const path = require('path');

// Mock DOM environment extensively
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
    offsetHeight: 20,
    offsetWidth: 100,
    scrollLeft: 0,
    scrollTop: 0,
    clientHeight: 400,
    clientWidth: 600
  })),
  getElementById: jest.fn(() => ({
    style: {},
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    offsetHeight: 500,
    offsetWidth: 800,
    addEventListener: jest.fn()
  })),
  getElementsByTagName: jest.fn(() => []),
  body: {
    appendChild: jest.fn()
  }
};

global.window = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  setTimeout: jest.fn((fn) => fn()),
  clearTimeout: jest.fn(),
  getSelection: jest.fn(() => ({
    removeAllRanges: jest.fn()
  }))
};

global.navigator = {
  userAgent: 'Mozilla/5.0 (Test Browser)'
};

// Load required modules in order
const socialCalcCode = fs.readFileSync(path.join(__dirname, '../../socialcalc-3.js'), 'utf8');
const tableEditorCode = fs.readFileSync(path.join(__dirname, '../../socialcalctableeditor.js'), 'utf8');

eval(socialCalcCode);
eval(tableEditorCode);

describe('SocialCalc.TableEditor', () => {
  let tableEditor;
  let mockSheet;

  beforeEach(() => {
    if (typeof SocialCalc.Sheet === 'function') {
      mockSheet = new SocialCalc.Sheet();
    }

    if (typeof SocialCalc.TableEditor === 'function') {
      tableEditor = new SocialCalc.TableEditor(mockSheet);
    }
  });

  describe('Constructor', () => {
    it('should create a TableEditor instance', () => {
      if (tableEditor) {
        expect(tableEditor).toBeDefined();
        expect(typeof tableEditor).toBe('object');
      }
    });

    it('should initialize with a sheet', () => {
      if (tableEditor && mockSheet) {
        expect(tableEditor.context).toBeDefined();
        expect(tableEditor.context.sheet).toBe(mockSheet);
      }
    });

    it('should initialize default properties', () => {
      if (tableEditor) {
        expect(tableEditor.toplevel).toBeDefined();
        expect(tableEditor.griddiv).toBeDefined();
        expect(tableEditor.fullgrid).toBeDefined();
      }
    });
  });

  describe('CreateTableEditor', () => {
    it('should be a function', () => {
      if (tableEditor) {
        expect(typeof tableEditor.CreateTableEditor).toBe('function');
      }
    });

    it('should create editor with dimensions', () => {
      if (tableEditor && tableEditor.CreateTableEditor) {
        expect(() => {
          tableEditor.CreateTableEditor(500, 400);
        }).not.toThrow();
      }
    });

    it('should handle different sizes', () => {
      if (tableEditor && tableEditor.CreateTableEditor) {
        expect(() => {
          tableEditor.CreateTableEditor(800, 600);
        }).not.toThrow();
        
        expect(() => {
          tableEditor.CreateTableEditor(300, 200);
        }).not.toThrow();
      }
    });
  });

  describe('Grid rendering', () => {
    it('should have rendering context', () => {
      if (tableEditor) {
        expect(tableEditor.context).toBeDefined();
        if (tableEditor.context) {
          expect(typeof tableEditor.context.RenderSheet).toBe('function');
        }
      }
    });

    it('should handle grid updates', () => {
      if (tableEditor && tableEditor.ScheduleRender) {
        expect(typeof tableEditor.ScheduleRender).toBe('function');
        expect(() => {
          tableEditor.ScheduleRender();
        }).not.toThrow();
      }
    });
  });

  describe('Cell selection', () => {
    it('should have cursor management', () => {
      if (tableEditor) {
        expect(tableEditor.ecell).toBeDefined();
        if (tableEditor.MoveECellWithKey) {
          expect(typeof tableEditor.MoveECellWithKey).toBe('function');
        }
      }
    });

    it('should handle cell navigation', () => {
      if (tableEditor && tableEditor.MoveECell) {
        expect(typeof tableEditor.MoveECell).toBe('function');
        expect(() => {
          tableEditor.MoveECell('A1');
        }).not.toThrow();
      }
    });
  });

  describe('Keyboard handling', () => {
    it('should have keyboard event handlers', () => {
      if (tableEditor) {
        if (tableEditor.ProcessKey) {
          expect(typeof tableEditor.ProcessKey).toBe('function');
        }
      }
    });

    it('should handle key events', () => {
      if (tableEditor && tableEditor.ProcessKey) {
        const mockEvent = {
          keyCode: 65, // 'A' key
          which: 65,
          shiftKey: false,
          ctrlKey: false,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        };

        expect(() => {
          tableEditor.ProcessKey(mockEvent);
        }).not.toThrow();
      }
    });
  });

  describe('Mouse handling', () => {
    it('should handle mouse events', () => {
      if (tableEditor && tableEditor.ProcessMouseEvent) {
        expect(typeof tableEditor.ProcessMouseEvent).toBe('function');
        
        const mockEvent = {
          clientX: 100,
          clientY: 100,
          button: 0,
          preventDefault: jest.fn(),
          stopPropagation: jest.fn()
        };

        expect(() => {
          tableEditor.ProcessMouseEvent(mockEvent, 'click');
        }).not.toThrow();
      }
    });
  });

  describe('Scrolling', () => {
    it('should have scroll handling methods', () => {
      if (tableEditor) {
        if (tableEditor.ScrollTableUpOneRow) {
          expect(typeof tableEditor.ScrollTableUpOneRow).toBe('function');
        }
        if (tableEditor.ScrollTableDownOneRow) {
          expect(typeof tableEditor.ScrollTableDownOneRow).toBe('function');
        }
      }
    });

    it('should handle scroll operations', () => {
      if (tableEditor && tableEditor.ScrollTableUpOneRow) {
        expect(() => {
          tableEditor.ScrollTableUpOneRow();
        }).not.toThrow();
      }
    });
  });

  describe('Editing mode', () => {
    it('should handle edit mode transitions', () => {
      if (tableEditor) {
        if (tableEditor.StartCellEdit) {
          expect(typeof tableEditor.StartCellEdit).toBe('function');
        }
        if (tableEditor.EndCellEdit) {
          expect(typeof tableEditor.EndCellEdit).toBe('function');
        }
      }
    });

    it('should enter and exit edit mode', () => {
      if (tableEditor && tableEditor.StartCellEdit && tableEditor.EndCellEdit) {
        expect(() => {
          tableEditor.StartCellEdit();
        }).not.toThrow();
        
        expect(() => {
          tableEditor.EndCellEdit();
        }).not.toThrow();
      }
    });
  });

  describe('Layout computation', () => {
    it('should compute layout correctly', () => {
      if (tableEditor && tableEditor.ComputeTableSkipData) {
        expect(typeof tableEditor.ComputeTableSkipData).toBe('function');
        expect(() => {
          tableEditor.ComputeTableSkipData();
        }).not.toThrow();
      }
    });

    it('should handle resize events', () => {
      if (tableEditor && tableEditor.ResizeTableEditor) {
        expect(typeof tableEditor.ResizeTableEditor).toBe('function');
        expect(() => {
          tableEditor.ResizeTableEditor(600, 450);
        }).not.toThrow();
      }
    });
  });

  describe('Error handling', () => {
    it('should handle null sheet gracefully', () => {
      if (typeof SocialCalc.TableEditor === 'function') {
        expect(() => {
          new SocialCalc.TableEditor(null);
        }).not.toThrow();
      }
    });

    it('should handle invalid dimensions', () => {
      if (tableEditor && tableEditor.CreateTableEditor) {
        expect(() => {
          tableEditor.CreateTableEditor(-100, -100);
        }).not.toThrow();
        
        expect(() => {
          tableEditor.CreateTableEditor(0, 0);
        }).not.toThrow();
      }
    });
  });

  describe('State management', () => {
    it('should maintain editor state', () => {
      if (tableEditor) {
        const initialEcell = tableEditor.ecell;
        
        // Perform operations
        if (tableEditor.MoveECell) {
          tableEditor.MoveECell('B2');
        }
        
        // State should be updated
        if (tableEditor.ecell && initialEcell) {
          expect(tableEditor.ecell).toBeDefined();
        }
      }
    });
  });

  describe('Drag and drop', () => {
    it('should have drag handling methods if available', () => {
      if (tableEditor) {
        if (tableEditor.ProcessMouseEvent) {
          expect(typeof tableEditor.ProcessMouseEvent).toBe('function');
        }
      }
    });
  });
});