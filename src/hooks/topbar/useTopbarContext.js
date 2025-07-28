import { useContext } from 'react';
import { TopbarContext } from './TopbarContext';

export const useTopbarContext = () => {
  const context = useContext(TopbarContext);
  if (!context) {
    throw new Error('useTopbarContext must be used within a TopbarProvider');
  }
  return context;
};
