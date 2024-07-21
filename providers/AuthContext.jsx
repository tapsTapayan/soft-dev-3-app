'use client';
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';

import LoadingScreen from '@/components/Loading';
import { auth, db } from '@/firebase/config';
import { useToast } from '@chakra-ui/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { userCollection } from '@/constants/Firebase.constants';

export const AuthContext = React.createContext({
  user: null,
  userDetails: null,
  loading: true,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          try {
            onSnapshot(doc(db, userCollection, user?.uid), (doc) => {
              const data = doc.data();
              setUserDetails(data);
            });
          } catch (error) {
            toast({
              title: 'An error occurred while getting your account details.',
              description: 'Please reload the page to try again.',
              status: 'error',
              position: 'top',
              duration: 3000,
            });
          }
        } else {
          setUser(null);
          setUserDetails(null);
        }
        setLoading(false);
      });

    return unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userDetails, loading }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
