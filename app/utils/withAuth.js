import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getStoredToken } from './authStorage';

const withAuth = (WrappedComponent) => {
  const AuthGuard = (props) => {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      const token = getStoredToken();
      if (!token) {
        router.replace('/login');
      } else {
        setIsReady(true);
      }
    }, []);

    if (!isReady) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };

  AuthGuard.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return AuthGuard;
};

export default withAuth;
