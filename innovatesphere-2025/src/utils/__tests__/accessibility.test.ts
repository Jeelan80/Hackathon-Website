import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getContrastRatio,
  meetsContrastRequirement,
  announceToScreenReader,
  focusManagement,
  keyboardNavigation,
  accessibilityTesting,
  highContrastMode,
  reducedMotion,
  fontSize,
} from '../accessibility';

describe('Accessibility Utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  describe('getContrastRatio', () => {
    it('should calculate contrast ratio correctly', () => {
      // Black on white should have high contrast
      const blackWhiteRatio = getContrastRatio('#000000', '#ffffff');
      expect(blackWhiteRatio).toBeCloseTo(21, 0);

      // Same colors should have ratio of 1
      const sameColorRatio = getContrastRatio('#ff0000', '#ff0000');
      expect(sameColorRatio).toBe(1);
    });

    it('should handle hex colors without # prefix', () => {
      const ratio = getContrastRatio('000000', 'ffffff');
      expect(ratio).toBeCloseTo(21, 0);
    });
  });

  describe('meetsContrastRequirement', () => {
    it('should correctly identify WCAG AA compliance', () => {
      // Black on white meets AA for both normal and large text
      expect(meetsContrastRequirement('#000000', '#ffffff', 'AA', 'normal')).toBe(true);
      expect(meetsContrastRequirement('#000000', '#ffffff', 'AA', 'large')).toBe(true);

      // Low contrast should fail
      expect(meetsContrastRequirement('#888888', '#999999', 'AA', 'normal')).toBe(false);
    });

    it('should correctly identify WCAG AAA compliance', () => {
      // Black on white meets AAA
      expect(meetsContrastRequirement('#000000', '#ffffff', 'AAA', 'normal')).toBe(true);
      
      // Medium contrast might pass AA but fail AAA
      expect(meetsContrastRequirement('#666666', '#ffffff', 'AA', 'normal')).toBe(true);
      expect(meetsContrastRequirement('#666666', '#ffffff', 'AAA', 'normal')).toBe(false);
    });
  });

  describe('announceToScreenReader', () => {
    it('should create and remove announcement element', () => {
      announceToScreenReader('Test announcement');
      
      const announcer = document.querySelector('[aria-live]');
      expect(announcer).toBeTruthy();
      expect(announcer?.textContent).toBe('Test announcement');
      expect(announcer?.getAttribute('aria-live')).toBe('polite');
    });

    it('should support assertive priority', () => {
      announceToScreenReader('Urgent message', 'assertive');
      
      const announcer = document.querySelector('[aria-live="assertive"]');
      expect(announcer).toBeTruthy();
    });
  });

  describe('focusManagement', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="container">
          <button id="btn1">Button 1</button>
          <a href="#" id="link1">Link 1</a>
          <input id="input1" type="text" />
          <button id="btn2" disabled>Disabled Button</button>
          <button id="btn3">Button 3</button>
        </div>
      `;
    });

    describe('getFocusableElements', () => {
      it('should find all focusable elements', () => {
        const container = document.getElementById('container')!;
        const focusable = focusManagement.getFocusableElements(container);
        
        expect(focusable).toHaveLength(3); // btn1, link1, input1 (disabled button excluded)
        expect(focusable[0].id).toBe('btn1');
        expect(focusable[1].id).toBe('link1');
        expect(focusable[2].id).toBe('input1');
      });
    });

    describe('trapFocus', () => {
      it('should focus first element and set up tab trapping', () => {
        const container = document.getElementById('container')!;
        const cleanup = focusManagement.trapFocus(container);
        
        expect(document.activeElement?.id).toBe('btn1');
        
        cleanup();
      });
    });

    describe('saveFocus', () => {
      it('should save and restore focus', () => {
        const btn1 = document.getElementById('btn1')!;
        btn1.focus();
        
        const restoreFocus = focusManagement.saveFocus();
        
        const btn3 = document.getElementById('btn3')!;
        btn3.focus();
        expect(document.activeElement?.id).toBe('btn3');
        
        restoreFocus();
        expect(document.activeElement?.id).toBe('btn1');
      });
    });
  });

  describe('keyboardNavigation', () => {
    it('should handle arrow navigation correctly', () => {
      const items = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
      ];
      
      let currentIndex = 0;
      const onIndexChange = vi.fn((newIndex) => {
        currentIndex = newIndex;
      });

      // Test ArrowDown
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      keyboardNavigation.handleArrowNavigation(downEvent, items, currentIndex, onIndexChange);
      
      expect(onIndexChange).toHaveBeenCalledWith(1);

      // Test ArrowUp from index 0 (should wrap to last)
      const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      keyboardNavigation.handleArrowNavigation(upEvent, items, 0, onIndexChange);
      
      expect(onIndexChange).toHaveBeenCalledWith(2);

      // Test Home key
      const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
      keyboardNavigation.handleArrowNavigation(homeEvent, items, 2, onIndexChange);
      
      expect(onIndexChange).toHaveBeenCalledWith(0);

      // Test End key
      const endEvent = new KeyboardEvent('keydown', { key: 'End' });
      keyboardNavigation.handleArrowNavigation(endEvent, items, 0, onIndexChange);
      
      expect(onIndexChange).toHaveBeenCalledWith(2);
    });
  });

  describe('accessibilityTesting', () => {
    describe('checkImageAltText', () => {
      it('should identify images without alt text', () => {
        document.body.innerHTML = `
          <img src="test1.jpg" alt="Good alt text" />
          <img src="test2.jpg" />
          <img src="test3.jpg" aria-label="Good aria label" />
          <img src="test4.jpg" />
        `;

        const issues = accessibilityTesting.checkImageAltText();
        expect(issues).toHaveLength(2);
        expect(issues[0]).toContain('Image 2 is missing alt text');
        expect(issues[1]).toContain('Image 4 is missing alt text');
      });
    });

    describe('checkHeadingHierarchy', () => {
      it('should identify heading hierarchy issues', () => {
        document.body.innerHTML = `
          <h2>Should be h1</h2>
          <h4>Skips h3</h4>
        `;

        const issues = accessibilityTesting.checkHeadingHierarchy();
        expect(issues).toHaveLength(2);
        expect(issues[0]).toContain('Page should start with an h1 heading');
        expect(issues[1]).toContain('Heading level jumps from h2 to h4');
      });

      it('should pass with correct hierarchy', () => {
        document.body.innerHTML = `
          <h1>Main Title</h1>
          <h2>Section</h2>
          <h3>Subsection</h3>
        `;

        const issues = accessibilityTesting.checkHeadingHierarchy();
        expect(issues).toHaveLength(0);
      });
    });

    describe('checkFormLabels', () => {
      it('should identify form inputs without labels', () => {
        document.body.innerHTML = `
          <input type="text" id="good-input" />
          <label for="good-input">Good Label</label>
          <input type="text" />
          <input type="text" aria-label="Good aria label" />
          <input type="hidden" />
          <input type="submit" value="Submit" />
        `;

        const issues = accessibilityTesting.checkFormLabels();
        expect(issues).toHaveLength(1);
        expect(issues[0]).toContain('Form input 2 is missing a label');
      });
    });

    describe('checkButtonAccessibility', () => {
      it('should identify buttons without accessible names', () => {
        document.body.innerHTML = `
          <button>Good Button</button>
          <button></button>
          <button aria-label="Good Aria Label"></button>
          <div role="button"></div>
        `;

        const issues = accessibilityTesting.checkButtonAccessibility();
        expect(issues).toHaveLength(2);
        expect(issues[0]).toContain('Button 2 is missing accessible name');
        expect(issues[1]).toContain('Button 4 is missing accessible name');
      });
    });
  });

  describe('highContrastMode', () => {
    it('should enable high contrast mode', () => {
      highContrastMode.enable();
      
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
      expect(localStorage.getItem('high-contrast')).toBe('enabled');
    });

    it('should disable high contrast mode', () => {
      document.documentElement.classList.add('high-contrast');
      
      highContrastMode.disable();
      
      expect(document.documentElement.classList.contains('high-contrast')).toBe(false);
      expect(localStorage.getItem('high-contrast')).toBe('disabled');
    });

    it('should toggle high contrast mode', () => {
      expect(highContrastMode.isEnabled()).toBe(false);
      
      highContrastMode.toggle();
      expect(highContrastMode.isEnabled()).toBe(true);
      
      highContrastMode.toggle();
      expect(highContrastMode.isEnabled()).toBe(false);
    });
  });

  describe('reducedMotion', () => {
    it('should enable reduced motion', () => {
      reducedMotion.enable();
      
      expect(document.documentElement.classList.contains('reduce-motion')).toBe(true);
      expect(localStorage.getItem('reduce-motion')).toBe('enabled');
    });

    it('should disable reduced motion', () => {
      document.documentElement.classList.add('reduce-motion');
      
      reducedMotion.disable();
      
      expect(document.documentElement.classList.contains('reduce-motion')).toBe(false);
      expect(localStorage.getItem('reduce-motion')).toBe('disabled');
    });
  });

  describe('fontSize', () => {
    it('should set font size classes', () => {
      fontSize.set('large');
      
      expect(document.documentElement.classList.contains('font-size-large')).toBe(true);
      expect(localStorage.getItem('font-size')).toBe('large');
    });

    it('should get stored font size', () => {
      localStorage.setItem('font-size', 'extra-large');
      
      expect(fontSize.get()).toBe('extra-large');
    });

    it('should return normal as default', () => {
      expect(fontSize.get()).toBe('normal');
    });
  });
});