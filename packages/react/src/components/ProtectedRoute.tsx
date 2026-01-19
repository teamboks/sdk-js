import React, { ReactNode } from 'react';

import useFeature from '../hooks/useFeature';

interface ProtectedRouteProps {
  feature: string;
  segment?: string | null;
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  feature,
  segment = null,
  children,
  fallback = null,
  loadingFallback = null,
}) => {
  const { isEnabled, isLoading, error } = useFeature({
    feature,
    segment,
  });

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!isEnabled || error) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
