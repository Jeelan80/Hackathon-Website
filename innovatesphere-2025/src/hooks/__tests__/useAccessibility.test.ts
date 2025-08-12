import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAccessibility } from '../useAccessibility';

// Mock matchMedia
const mockMatchMedia = vi.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('useAccessibility', () => {
  beforeEach(() => {
    // Reset DOM
    document.documentElement.style.fontSize = '';
    
    // Mock matchMedia implementation
    mockMatchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default preferences', () => {
    const { result } = renderHook(() => useAccessibility());

    expect(result.current.preferences).toEqual({
      prefersReducedMotion: false,
      prefersHighContrast: false,
      prefersDarkMode: true,
      fontSize: 'normal',
    });
  });

  it('should detect reduced motion preference', () => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useAccessibility());

    expect(result.current.preferences.prefersReducedMotion).toBe(true);
    expect(result.current.shouldReduceMotion).toBe(true);
  });

  it('should detect high contrast preference', () => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-contrast: high)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useAccessibility());

    expect(result.current.preferences.prefersHighContrast).toBe(true);
    expect(result.current.shouldUseHighContrast).toBe(true);
  });

  it('should update font size and apply to document', () => {
    const { result } = renderHook(() => useAccessibility());

    act(() => {
      result.current.updateFontSize('large');
    });

    expect(result.current.preferences.fontSize).toBe('large');
    expect(document.documentElement.style.fontSize).toBe('18px');

    act(() => {
      result.current.updateFontSize('extra-large');
    });

    expect(result.current.preferences.fontSize).toBe('extra-large');
    expect(document.documentElement.style.fontSize).toBe('20px');

    act(() => {
      result.current.updateFontSize('normal');
    });

    expect(result.current.preferences.fontSize).toBe('normal');
    expect(document.documentElement.style.fontSize).toBe('16px');
  });

  it('should provide helper functions', () => {
    const { result } = renderHook(() => useAccessibility());

    expect(typeof result.current.shouldReduceMotion).toBe('boolean');
    expect(typeof result.current.shouldUseHighContrast).toBe('boolean');
    expect(typeof result.current.shouldUseDarkMode).toBe('boolean');
  });

  it('should listen for media query changes', () => {
    const addEventListenerSpy = vi.fn();
    const removeEventListenerSpy = vi.fn();

    mockMatchMedia.mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: addEventListenerSpy,
      removeEventListener: removeEventListenerSpy,
      dispatchEvent: vi.fn(),
    }));

    const { unmount } = renderHook(() => useAccessibility());

    // Should add event listeners for all media queries
    expect(addEventListenerSpy).toHaveBeenCalledTimes(3);

    unmount();

    // Should remove event listeners on cleanup
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
  });
});