'use client';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import LoadingScreen from '@/components/Loading';
import { userCollection } from '@/constants/Firebase.constants';
import { db } from '@/firebase/config';
import { useToast } from '@chakra-ui/react';

export const UsernameContext = React.createContext({
  loadingUsernames: true,
  accountQuantity: 0,
  usernames: [],
});

export const useUsernameContext = () => React.useContext(UsernameContext);

export const UsernameProvider = ({ children }) => {
  const toast = useToast();
  const [usernames, setUsernames] = useState([]);
  const [accountQuantity, setAccountQuantity] = useState(0);
  const [loadingUsernames, setLoadingUsernames] = useState(true);
  const unsubscribeListener = [];

  useEffect(() => {
    const getAdminDetails = async () => {
      setLoadingUsernames(true);

      try {
        const q = query(collection(db, userCollection));
        return new Promise((resolve) => {
          const unsubscribe = onSnapshot(q, (doc) => {
            const data = doc.docs;
            data.forEach((userDetails, index) => {
              setUsernames((prevUserDetails) => {
                const newUserDetails = [...prevUserDetails];
                newUserDetails[index] = {
                  username: userDetails.data().username,
                  email: userDetails.data().email,
                };
                return newUserDetails;
              });
            });
            setAccountQuantity(data.length);
            resolve();
          });

          unsubscribeListener.push(unsubscribe);
        });
      } catch (error) {
        console.error('Error fetching Authentication details:', error);
        setLoadingUsernames(false);
        toast({
          title: 'An error occurred while getting log-in details',
          description: 'Please reload the page to try again.',
          status: 'error',
          position: 'top',
          duration: 3000,
        });
      } finally {
        setLoadingUsernames(false);
      }
    };
    getAdminDetails();
  }, []);

  return loadingUsernames ? (
    <LoadingScreen />
  ) : (
    <UsernameContext.Provider
      value={{ loadingUsernames, accountQuantity, usernames }}
    >
      {children}
    </UsernameContext.Provider>
  );
};
