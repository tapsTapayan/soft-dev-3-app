'use client';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import LoadingScreen from '@/components/Loading';
import { userCollection } from '@/constants/Firebase.constants';
import { db } from '@/firebase/config';
import { useToast } from '@chakra-ui/react';

export const AccountsContext = React.createContext({
  loadingAccounts: true,
  setAccountsData: () => {},
  accountQuantity: 0,
  accountsData: null,
});

export const useAccountsContext = () => React.useContext(AccountsContext);

export const AccountsProvider = ({ children }) => {
  const toast = useToast();
  const [accountsData, setAccountsData] = useState();
  const [accountQuantity, setAccountQuantity] = useState(0);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  useEffect(() => {
    const getAccountsDetails = () => {
      setLoadingAccounts(true);
      try {
        const q = query(collection(db, userCollection));
        onSnapshot(q, (doc) => {
          const data = doc.docs;
          setAccountsData(data ?? null);
          setAccountQuantity(data.length);
        });
      } catch (error) {
        toast({
          title: 'An error occurred while getting your accounts data.',
          description: 'Please reload the page to try again.',
          status: 'error',
          position: 'top',
          duration: 3000,
        });
      }

      setLoadingAccounts(false);
    };

    getAccountsDetails();
  }, []);

  return loadingAccounts ? (
    <LoadingScreen />
  ) : (
    <AccountsContext.Provider
      value={{
        loadingAccounts,
        setAccountsData,
        accountQuantity,
        accountsData,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
