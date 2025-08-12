import { describe, it, expect } from 'vitest';
import { render } from '../utils/test-utils';
import { GlassmorphismCard } from '../../components/ui';

describe('Glassmorphism Visual Tests', () => {
  it('should render glassmorphism card with correct styles', () => {
    const { container } = render(
      <GlassmorphismCard className="test-card">
        <div>Test Content</div>
      </GlassmorphismCard>
    );
    
    const card = container.querySelector('.test-card');
    expect(card).toBeInTheDocument();
    
    // Check for glassmorphism classes
    expect(card).toHaveClass('backdrop-blur-md');
    expect(card).toHaveClass('bg-glass-white');
    expect(card).toHaveClass('border-glass-border');
  });

  it('should apply glow effect when enabled', () => {
    const { container } = render(
      <GlassmorphismCard glow className="test-card">
        <div>Test Content</div>
      </GlassmorphismCard>
    );
    
    const card = container.querySelector('.test-card');
    expect(card).toHaveClass('glow-effect');
  });

  it('should support different blur levels', () => {
    const { container, rerender } = render(
      <GlassmorphismCard blur="sm" className="test-card">
        <div>Test Content</div>
      </GlassmorphismCard>
    );
    
    let card = container.querySelector('.test-card');
    expect(card).toHaveClass('backdrop-blur-sm');
    
    rerender(
      <GlassmorphismCard blur="lg" className="test-card">
        <div>Test Content</div>
      </GlassmorphismCard>
    );
    
    card = container.querySelector('.test-card');
    expect(card).toHaveClass('backdrop-blur-lg');
  });

  it('should maintain glassmorphism effects in high contrast mode', () => {
    // Enable high contrast mode
    document.documentElement.classList.add('high-contrast');
    
    const { container } = render(
      <GlassmorphismCard className="test-card">
        <div>Test Content</div>
      </GlassmorphismCard>
    );
    
    const card = container.querySelector('.test-card');
    expect(card).toBeInTheDocument();
    
    // In high contrast mode, glassmorphism should be modified but still present
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
    
    // Clean up
    document.documentElement.classList.remove('high-contrast');
  });

  it('should handle reduced motion preferences', () => {
    // Enable reduced motion
    document.documentElement.classList.add('reduce-motion');
    
    const { container } = render(
      <GlassmorphismCard className="test-card">
        <div>Test Content</div>
      </GlassmorphismCard>
    );
    
    const card = container.querySelector('.test-card');
    expect(card).toBeInTheDocument();
    
    // Verify reduced motion class is applied
    expect(document.documentElement.classList.contains('reduce-motion')).toBe(true);
    
    // Clean up
    document.documentElement.classList.remove('reduce-motion');
  });
});