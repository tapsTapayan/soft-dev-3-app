'use client';
import React, { useEffect, useState } from 'react';

export const ScrollContext = React.createContext({
  scrollX: 0,
  scrollY: 0,
});

export const useScrollContext = () => React.useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollX(window.scrollX);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);
  return (
    <ScrollContext.Provider value={{ scrollX, scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};
