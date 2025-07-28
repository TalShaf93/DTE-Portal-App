import { createContext } from 'react';

/**
 * Sidebar Context - Provides sidebar state management across the application
 * 
 * Follows the same pattern as AuthContext in the project.
 * Used by the useSidebar hook to share sidebar state between components.
 */
export const SidebarContext = createContext(null);