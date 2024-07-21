'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useAuthContext } from '../AuthContext';

export const NavContext = React.createContext({
  active: '',
  title: '',
  root: '',
  subPath: '',
});

export const useNavContext = () => React.useContext(NavContext);

export const NavProvider = ({ children }) => {
  const pathname = usePathname();
  const tabPaths = pathname.split('/');
  const { user } = useAuthContext();

  const [active, setActive] = useState('');
  const [title, setTitle] = useState('');
  const [root, setRoot] = useState('');
  const [subPath, setSubPath] = useState('');

  const pathnames = ['', 'projects', 'designs', 'profile'];

  const tabs = ['Home', 'My Projects', 'My Designs', 'My Profile'];

  useEffect(() => {
    const getTabData = () => {
      setRoot(tabPaths[1]);
      setActive(tabPaths[2]);
      setTitle(tabs?.at(pathnames.indexOf(tabPaths[2] ?? 0)));
      setSubPath(tabPaths[3]);
    };
    getTabData();
  }, [pathname, user]);

  return (
    <NavContext.Provider
      value={{
        active,
        title,
        root,
        subPath,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
