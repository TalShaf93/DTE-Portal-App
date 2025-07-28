import React from 'react';
import { TopbarContext } from './TopbarContext';
import { useTopbar } from './useTopbar';

export const TopbarProvider = ({ children }) => {
  const topbarState = useTopbar();
  return (
    <TopbarContext.Provider value={topbarState}>
      {children}
    </TopbarContext.Provider>
  );
};
