import React, { ReactNode } from 'react';

import usePermission from '../hooks/usePermission';

interface ProtectedRouteProps {
  feature: string;
  action: string;
  role: string;
  segmentId?: string | null;
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  feature,
  action,
  role,
  segmentId = null,
  children,
  fallback = null,
  loadingFallback = null,
}) => {
  const { canActivate, isLoading, error } = usePermission({
    feature,
    action,
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
