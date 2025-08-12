/**
 * Accessibility utilities and testing helpers
 */

// Color contrast calculation utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

// Check if contrast meets WCAG standards
export const meetsContrastRequirement = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
  
  return size === 'large' ? ratio >= 3 : ratio >= 4.5;
};

// Screen reader announcements
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.textContent = message;
  
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
};

// Focus management utilities
export const focusManagement = {
  // Get all focusable elements within a container
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors));
  },

  // Trap focus within a container
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = focusManagement.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  // Save and restore focus
  saveFocus: (): (() => void) => {
    const activeElement = document.activeElement as HTMLElement;
    return () => {
      if (activeElement && typeof activeElement.focus === 'function') {
        activeElement.focus();
      }
    };
  }
};

// Keyboard navigation helpers
export const keyboardNavigation = {
  // Handle arrow key navigation in a list
  handleArrowNavigation: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onIndexChange: (newIndex: number) => void
  ): void => {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    onIndexChange(newIndex);
    items[newIndex]?.focus();
  }
};

// Accessibility testing utilities
export const accessibilityTesting = {
  // Check for missing alt text on images
  checkImageAltText: (): string[] => {
    const images = Array.from(document.querySelectorAll('img'));
    const issues: string[] = [];

    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-label') && !img.getAttribute('aria-labelledby')) {
        issues.push(`Image ${index + 1} is missing alt text: ${img.src}`);
      }
    });

    return issues;
  },

  // Check for proper heading hierarchy
  checkHeadingHierarchy: (): string[] => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const issues: string[] = [];
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && currentLevel !== 1) {
        issues.push('Page should start with an h1 heading');
      }
      
      if (currentLevel > previousLevel + 1) {
        issues.push(`Heading level jumps from h${previousLevel} to h${currentLevel} at: "${heading.textContent}"`);
      }
      
      previousLevel = currentLevel;
    });

    return issues;
  },

  // Check for proper form labels
  checkFormLabels: (): string[] => {
    const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
    const issues: string[] = [];

    inputs.forEach((input, index) => {
      const inputElement = input as HTMLInputElement;
      const hasLabel = input.getAttribute('aria-label') || 
                      input.getAttribute('aria-labelledby') ||
                      document.querySelector(`label[for="${input.id}"]`);

      if (!hasLabel && inputElement.type !== 'hidden' && inputElement.type !== 'submit' && inputElement.type !== 'button') {
        issues.push(`Form input ${index + 1} is missing a label: ${input.outerHTML.substring(0, 100)}...`);
      }
    });

    return issues;
  },

  // Check for proper button accessibility
  checkButtonAccessibility: (): string[] => {
    const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
    const issues: string[] = [];

    buttons.forEach((button, index) => {
      const hasAccessibleName = button.textContent?.trim() ||
                               button.getAttribute('aria-label') ||
                               button.getAttribute('aria-labelledby');

      if (!hasAccessibleName) {
        issues.push(`Button ${index + 1} is missing accessible name: ${button.outerHTML.substring(0, 100)}...`);
      }
    });

    return issues;
  },

  // Run all accessibility checks
  runAllChecks: (): { category: string; issues: string[] }[] => {
    return [
      { category: 'Images', issues: accessibilityTesting.checkImageAltText() },
      { category: 'Headings', issues: accessibilityTesting.checkHeadingHierarchy() },
      { category: 'Forms', issues: accessibilityTesting.checkFormLabels() },
      { category: 'Buttons', issues: accessibilityTesting.checkButtonAccessibility() }
    ];
  }
};

// High contrast mode utilities
export const highContrastMode = {
  enable: (): void => {
    document.documentElement.classList.add('high-contrast');
    localStorage.setItem('high-contrast', 'enabled');
    announceToScreenReader('High contrast mode enabled');
  },

  disable: (): void => {
    document.documentElement.classList.remove('high-contrast');
    localStorage.setItem('high-contrast', 'disabled');
    announceToScreenReader('High contrast mode disabled');
  },

  toggle: (): void => {
    if (document.documentElement.classList.contains('high-contrast')) {
      highContrastMode.disable();
    } else {
      highContrastMode.enable();
    }
  },

  isEnabled: (): boolean => {
    return document.documentElement.classList.contains('high-contrast');
  }
};

// Reduced motion utilities
export const reducedMotion = {
  enable: (): void => {
    document.documentElement.classList.add('reduce-motion');
    localStorage.setItem('reduce-motion', 'enabled');
    announceToScreenReader('Reduced motion enabled');
  },

  disable: (): void => {
    document.documentElement.classList.remove('reduce-motion');
    localStorage.setItem('reduce-motion', 'disabled');
    announceToScreenReader('Reduced motion disabled');
  },

  toggle: (): void => {
    if (document.documentElement.classList.contains('reduce-motion')) {
      reducedMotion.disable();
    } else {
      reducedMotion.enable();
    }
  },

  isEnabled: (): boolean => {
    return document.documentElement.classList.contains('reduce-motion') ||
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// Font size utilities
export const fontSize = {
  set: (size: 'normal' | 'large' | 'extra-large'): void => {
    const root = document.documentElement;
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-extra-large');
    root.classList.add(`font-size-${size}`);
    localStorage.setItem('font-size', size);
    announceToScreenReader(`Font size changed to ${size}`);
  },

  get: (): 'normal' | 'large' | 'extra-large' => {
    const stored = localStorage.getItem('font-size') as 'normal' | 'large' | 'extra-large';
    return stored || 'normal';
  }
};

export default {
  getContrastRatio,
  meetsContrastRequirement,
  announceToScreenReader,
  focusManagement,
  keyboardNavigation,
  accessibilityTesting,
  highContrastMode,
  reducedMotion,
  fontSize
};