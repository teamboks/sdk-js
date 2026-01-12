import React, { ReactNode } from 'react';

import useRoutePermission from '../hooks/useRoutePermission';

interface ProtectedRouteProps {
  feature: string;
  role: string;
  segmentId?: string | null;
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  feature,
  role,
  segmentId = null,
  children,
  fallback = null,
  loadingFallback = null,
}) => {
  const { canActivate, isLoading, error } = useRoutePermission({
    feature,
    role,
    segmentId,
  });

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!canActivate || error) {
    return <>{fallback}</>;
  }

  // Render children if permission is granted
  return <>{children}</>;
};
