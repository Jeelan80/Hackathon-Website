import { useEffect, useState } from 'react';

interface AccessibilityPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersDarkMode: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
}

export const useAccessibility = () => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersDarkMode: true, // Default for our dark theme
    fontSize: 'normal'
  });

  useEffect(() => {
    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updatePreferences = () => {
      setPreferences(prev => ({
        ...prev,
        prefersReducedMotion: reducedMotionQuery.matches,
        prefersHighContrast: highContrastQuery.matches,
        prefersDarkMode: darkModeQuery.matches
      }));
    };

    // Initial check
    updatePreferences();

    // Listen for changes
    reducedMotionQuery.addEventListener('change', updatePreferences);
    highContrastQuery.addEventListener('change', updatePreferences);
    darkModeQuery.addEventListener('change', updatePreferences);

    return () => {
      reducedMotionQuery.removeEventListener('change', updatePreferences);
      highContrastQuery.removeEventListener('change', updatePreferences);
      darkModeQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  const updateFontSize = (size: AccessibilityPreferences['fontSize']) => {
    setPreferences(prev => ({ ...prev, fontSize: size }));
    
    // Apply font size to document
    const root = document.documentElement;
    switch (size) {
      case 'large':
        root.style.fontSize = '18px';
        break;
      case 'extra-large':
        root.style.fontSize = '20px';
        break;
      default:
        root.style.fontSize = '16px';
    }
  };

  return {
    preferences,
    updateFontSize,
    // Helper functions
    shouldReduceMotion: preferences.prefersReducedMotion,
    shouldUseHighContrast: preferences.prefersHighContrast,
    shouldUseDarkMode: preferences.prefersDarkMode
  };
};

export default useAccessibility;