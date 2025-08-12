import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionConfig reducedMotion="always">
      {children}
    </MotionConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Test utilities
export const createMockEvent = (type: string, properties = {}) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(event, properties);
  return event;
};

export const createMockKeyboardEvent = (key: string, properties = {}) => {
  return new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...properties,
  });
};

export const createMockMouseEvent = (type: string, properties = {}) => {
  return new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    ...properties,
  });
};

// Accessibility testing helpers
export const axeMatchers = {
  toBeAccessible: async (received: HTMLElement) => {
    const axe = await import('axe-core');
    const results = await axe.run(received);
    
    const violations = results.violations;
    const pass = violations.length === 0;
    
    if (pass) {
      return {
        message: () => `Expected element to have accessibility violations, but none were found`,
        pass: true,
      };
    } else {
      const violationMessages = violations.map(violation => 
        `${violation.id}: ${violation.description}\n${violation.nodes.map(node => `  - ${node.target}`).join('\n')}`
      ).join('\n\n');
      
      return {
        message: () => `Expected element to be accessible, but found violations:\n\n${violationMessages}`,
        pass: false,
      };
    }
  },
};

// Mock data generators
export const mockEventConfig = {
  name: 'Test Hackathon 2025',
  tagline: 'Test tagline for innovation',
  description: 'A test hackathon for testing purposes',
  eventType: 'Virtual Event',
  totalPrizes: '$10,000 in Prizes',
  duration: '48 hours',
};

export const mockJudge = {
  id: '1',
  name: 'Test Judge',
  title: 'Senior Developer',
  company: 'Test Company',
  image: '/test-image.jpg',
  linkedin: 'https://linkedin.com/in/testjudge',
};

export const mockSponsor = {
  name: 'Test Sponsor',
  logo: '/test-logo.png',
  website: 'https://testsponsor.com',
  tier: 'gold' as const,
};

export const mockFAQ = {
  question: 'Test question?',
  answer: 'Test answer to the question.',
  category: 'general',
};