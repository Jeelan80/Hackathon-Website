import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboardNavigation, focusManagement } from '../useKeyboardNavigation';

describe('useKeyboardNavigation', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should handle Enter key', () => {
    const onEnter = vi.fn();
    const { result } = renderHook(() => useKeyboardNavigation({ onEnter }));

    // Simulate ref assignment
    if (result.current.ref.current) {
      result.current.ref.current = mockElement;
    }

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    mockElement.dispatchEvent(enterEvent);

    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it('should handle Space key', () => {
    const onSpace = vi.fn();
    const { result } = renderHook(() => useKeyboardNavigation({ onSpace }));

    if (result.current.ref.current) {
      result.current.ref.current = mockElement;
    }

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    mockElement.dispatchEvent(spaceEvent);

    expect(onSpace).toHaveBeenCalledTimes(1);
  });

  it('should handle Escape key', () => {
    const onEscape = vi.fn();
    const { result } = renderHook(() => useKeyboardNavigation({ onEscape }));

    if (result.current.ref.current) {
      result.current.ref.current = mockElement;
    }

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    mockElement.dispatchEvent(escapeEvent);

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('should handle arrow keys', () => {
    const onArrowUp = vi.fn();
    const onArrowDown = vi.fn();
    const onArrowLeft = vi.fn();
    const onArrowRight = vi.fn();

    const { result } = renderHook(() => 
      useKeyboardNavigation({ 
        onArrowUp, 
        onArrowDown, 
        onArrowLeft, 
        onArrowRight 
      })
    );

    if (result.current.ref.current) {
      result.current.ref.current = mockElement;
    }

    // Test all arrow keys
    mockElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    mockElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    mockElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    mockElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    expect(onArrowUp).toHaveBeenCalledTimes(1);
    expect(onArrowDown).toHaveBeenCalledTimes(1);
    expect(onArrowLeft).toHaveBeenCalledTimes(1);
    expect(onArrowRight).toHaveBeenCalledTimes(1);
  });

  it('should not handle keys when disabled', () => {
    const onEnter = vi.fn();
    const { result } = renderHook(() => 
      useKeyboardNavigation({ onEnter, disabled: true })
    );

    if (result.current.ref.current) {
      result.current.ref.current = mockElement;
    }

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    mockElement.dispatchEvent(enterEvent);

    expect(onEnter).not.toHaveBeenCalled();
  });

  it('should prevent default for handled keys', () => {
    const onEnter = vi.fn();
    const { result } = renderHook(() => useKeyboardNavigation({ onEnter }));

    if (result.current.ref.current) {
      result.current.ref.current = mockElement;
    }

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault');
    
    mockElement.dispatchEvent(enterEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should clean up event listeners', () => {
    const onEnter = vi.fn();
    const { unmount } = renderHook(() => useKeyboardNavigation({ onEnter }));

    const removeEventListenerSpy = vi.spyOn(mockElement, 'removeEventListener');
    
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});

describe('focusManagement', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('trapFocus', () => {
    it('should trap focus within container', () => {
      document.body.innerHTML = `
        <div id="container">
          <button id="first">First</button>
          <button id="second">Second</button>
          <button id="last">Last</button>
        </div>
      `;

      const container = document.getElementById('container')!;
      const cleanup = focusManagement.trapFocus(container);

      // Should focus first element
      expect(document.activeElement?.id).toBe('first');

      cleanup();
    });
  });

  describe('getNextFocusableElement', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <button id="btn3">Button 3</button>
      `;
    });

    it('should get next focusable element', () => {
      const btn1 = document.getElementById('btn1')!;
      const next = focusManagement.getNextFocusableElement(btn1, 'next');
      
      expect(next?.id).toBe('btn2');
    });

    it('should get previous focusable element', () => {
      const btn2 = document.getElementById('btn2')!;
      const previous = focusManagement.getNextFocusableElement(btn2, 'previous');
      
      expect(previous?.id).toBe('btn1');
    });

    it('should wrap around at boundaries', () => {
      const btn3 = document.getElementById('btn3')!;
      const next = focusManagement.getNextFocusableElement(btn3, 'next');
      
      expect(next?.id).toBe('btn1');

      const btn1 = document.getElementById('btn1')!;
      const previous = focusManagement.getNextFocusableElement(btn1, 'previous');
      
      expect(previous?.id).toBe('btn3');
    });
  });

  describe('announce', () => {
    it('should create announcement element', () => {
      focusManagement.announce('Test message');

      const announcer = document.querySelector('[aria-live]');
      expect(announcer).toBeTruthy();
      expect(announcer?.textContent).toBe('Test message');
      expect(announcer?.getAttribute('aria-live')).toBe('polite');
    });

    it('should support assertive priority', () => {
      focusManagement.announce('Urgent message', 'assertive');

      const announcer = document.querySelector('[aria-live="assertive"]');
      expect(announcer).toBeTruthy();
    });

    it('should remove announcement after timeout', async () => {
      focusManagement.announce('Test message');

      expect(document.querySelector('[aria-live]')).toBeTruthy();

      // Wait for cleanup
      await new Promise(resolve => setTimeout(resolve, 1100));

      expect(document.querySelector('[aria-live]')).toBeFalsy();
    });
  });
});