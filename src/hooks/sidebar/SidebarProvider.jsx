import React from 'react';
import { SidebarContext } from './SidebarContext';
import { useSidebar } from './useSidebar';

/**
 * SidebarProvider Component - Provides sidebar context to the application
 * 
 * Features:
 * - Wraps the useSidebar hook logic
 * - Provides sidebar state to all child components
 * - Follows the same pattern as AuthProvider in the project
 * - Handles responsive behavior and state persistence
 * 
 * Usage:
 * ```jsx
 * // In App.jsx or main layout
 * <SidebarProvider>
 *   <YourAppComponents />
 * </SidebarProvider>
 * ```
 */
export const SidebarProvider = ({
    children,
    defaultCollapsed = false,
    storageKey = 'dantech-sidebar-collapsed',
    desktopBreakpoint = 1024
}) => {
    const sidebarState = useSidebar({
        defaultCollapsed,
        storageKey,
        desktopBreakpoint
    });

    return (
        <SidebarContext.Provider value={sidebarState}>
            {children}
        </SidebarContext.Provider>
    );
};