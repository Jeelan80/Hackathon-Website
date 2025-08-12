import { lazy } from 'react';

// Lazy load heavy components for better performance
export const LazyScheduleSection = lazy(() => import('./ScheduleSection'));
export const LazyJudgesSection = lazy(() => import('./JudgesSection'));
export const LazySponsorsSection = lazy(() => import('./SponsorsSection'));
export const LazyFAQSection = lazy(() => import('./FAQSection'));
export const LazyCommunitySection = lazy(() => import('./CommunitySection'));

// Registration form is also heavy due to multi-step logic
export const LazyRegistrationForm = lazy(() => import('../forms/RegistrationForm'));