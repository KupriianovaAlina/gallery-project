import React, { useContext, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { navigationRoutes } from '../routes';
import { StorageContext } from '../contexts/StorageProvider';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const storage = useContext(StorageContext);
  const location = useLocation();

  return storage.isAuthtoraized ? (
    <>{children}</>
  ) : (
    <Navigate to={navigationRoutes.signin()} state={{ from: location }} />
  );
};

export default AuthGuard;
