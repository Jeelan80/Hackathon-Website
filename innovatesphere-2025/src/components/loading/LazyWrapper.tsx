import React, { Suspense } from 'react';
import SkeletonLoader from './SkeletonLoader';
import ErrorBoundary from '../error/ErrorBoundary';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  skeletonVariant?: 'card' | 'text' | 'avatar' | 'button' | 'form';
  skeletonCount?: number;
  errorFallback?: React.ReactNode;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  skeletonVariant = 'card',
  skeletonCount = 1,
  errorFallback
}) => {
  const defaultFallback = fallback || (
    <SkeletonLoader 
      variant={skeletonVariant} 
      count={skeletonCount}
    />
  );

  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyWrapper;