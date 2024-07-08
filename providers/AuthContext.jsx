'use client';
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';

import LoadingScreen from '@/components/Loading';
import { auth } from '@/firebase/config';

export const AuthContext = React.createContext({
  user: null,
  loading: true,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });

    return unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
