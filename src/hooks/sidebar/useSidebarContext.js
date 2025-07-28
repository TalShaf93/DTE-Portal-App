import { useContext } from 'react';
import { SidebarContext } from './SidebarContext';

/**
 * Custom hook to use sidebar context
 * 
 * @returns {Object} Sidebar state and controls
 * @throws {Error} If used outside of SidebarProvider
 */
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  
  return context;
};