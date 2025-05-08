
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserPermissions } from '@/types/users';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: keyof UserPermissions;
}

export const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasPermission, currentUser } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute:", {
    path: location.pathname,
    isAuthenticated,
    isLoading,
    currentUser: currentUser?.name,
    requiredPermission,
    hasPermission: requiredPermission ? hasPermission(requiredPermission) : 'not required'
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-lg">Carregando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    console.log(`User doesn't have required permission: ${requiredPermission}`);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
