import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../auth/useAuth';
import { PRODUCTION_STATIONS } from '../../constants';

/**
 * useSidebar Hook - Manages sidebar state and responsive behavior
 * 
 * Features:
 * - Desktop-only sidebar (hidden on mobile following project pattern)
 * - Collapsed/expanded states with persistence
 * - Responsive breakpoint detection
 * - User role-based navigation filtering
 * - Automatic collapse on small screens
 * - Local storage persistence for user preference
 * - Smooth animations and transitions
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} options.defaultCollapsed - Initial collapsed state
 * @param {string} options.storageKey - Local storage key for persistence
 * @param {number} options.desktopBreakpoint - Breakpoint for desktop view (px)
 * @returns {Object} Sidebar state and controls
 */
export const useSidebar = ({
  defaultCollapsed = false,
  storageKey = 'dantech-sidebar-collapsed',
  desktopBreakpoint = 1024 // lg breakpoint matching project's lg:ml-64
} = {}) => {
  const { user } = useAuth();
  
  // Initialize collapsed state from localStorage or default
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') return defaultCollapsed;
    
    try {
      const stored = localStorage.getItem(storageKey);
      return stored !== null ? JSON.parse(stored) : defaultCollapsed;
    } catch {
      return defaultCollapsed;
    }
  });

  // Track if we're on desktop (where sidebar is visible)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= desktopBreakpoint;
  });

  // Track window resize for responsive behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= desktopBreakpoint;
      setIsDesktop(newIsDesktop);
      
      // Auto-collapse on mobile to desktop transition if needed
      if (!newIsDesktop && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [desktopBreakpoint, isCollapsed]);

  // Persist collapsed state to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(isCollapsed));
    } catch (error) {
      console.warn('Failed to save sidebar state to localStorage:', error);
    }
  }, [isCollapsed, storageKey]);

  // Navigation items based on user role (following project pattern)
  const navigationItems = useMemo(() => {
    const baseItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: 'Home',
        roles: ['admin', 'manager', 'operator', 'viewer'],
        badge: null,
      },
      {
        id: 'production',
        label: 'Production',
        path: '/production',
        icon: 'Activity',
        roles: ['admin', 'manager', 'operator'],
        badge: 'Live',
      },
      {
        id: 'inventory',
        label: 'Inventory',
        path: '/inventory',
        icon: 'Package',
        roles: ['admin', 'manager', 'operator'],
        badge: null,
      },
      {
        id: 'quality',
        label: 'Quality Control',
        path: '/quality',
        icon: 'CheckCircle',
        roles: ['admin', 'manager', 'operator'],
        badge: null,
      },
      {
        id: 'maintenance',
        label: 'Maintenance',
        path: '/maintenance',
        icon: 'Wrench',
        roles: ['admin', 'manager'],
        badge: null
      },
      {
        id: 'reports',
        label: 'Reports',
        path: '/reports',
        icon: 'BarChart3',
        roles: ['admin', 'manager'],
        badge: null
      },
      {
        id: 'admin',
        label: 'User Management',
        path: '/admin/users',
        icon: 'Shield',
        roles: ['admin'],
        badge: null
      }
    ];

    if (!user) return [];

    if (user.role === 'pworker') {
      return Object.entries(PRODUCTION_STATIONS).map(([key, label]) => ({
        id: `station-${key.toLowerCase()}`,
        label,
        path: '/worker',
        icon: 'Activity',
        roles: ['pworker'],
        station: label,
        badge: null,
      }));
    }

    return baseItems.filter((item) => item.roles.includes(user.role));
  }, [user]);

  // Control functions
  const toggle = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const reset = useCallback(() => {
    setIsCollapsed(defaultCollapsed);
  }, [defaultCollapsed]);

  // Computed properties
  const sidebarWidth = useMemo(() => {
    if (!isDesktop) return 0; // Hidden on mobile
    return isCollapsed ? 64 : 256; // 16rem = 256px for expanded, 4rem = 64px for collapsed
  }, [isDesktop, isCollapsed]);

  const contentMargin = useMemo(() => {
    if (!isDesktop) return 0; // No margin on mobile
    return sidebarWidth;
  }, [isDesktop, sidebarWidth]);

  // CSS classes for different states
  const sidebarClasses = useMemo(() => {
    const baseClasses = [
      'fixed left-0 top-0 h-full',
      'bg-gradient-to-b from-brand-349 to-brand-361',
      'transition-all duration-300 ease-in-out',
      'z-40 flex flex-col',
      'border-r border-brand-349/20'
    ];

    if (!isDesktop) {
      baseClasses.push('hidden'); // Completely hidden on mobile
    } else {
      baseClasses.push(
        'lg:block',
        isCollapsed ? 'w-16' : 'w-64'
      );
    }

    return baseClasses.join(' ');
  }, [isDesktop, isCollapsed]);

  const contentClasses = useMemo(() => {
    const baseClasses = [
      'transition-all duration-300',
      'min-h-[calc(100vh-73px)]' // Account for TopBar height
    ];

    if (isDesktop) {
      baseClasses.push(isCollapsed ? 'lg:ml-16' : 'lg:ml-64');
    }

    return baseClasses.join(' ');
  }, [isDesktop, isCollapsed]);

  // Utility functions
  const shouldShowLabel = useCallback((forceShow = false) => {
    return !isCollapsed || forceShow;
  }, [isCollapsed]);

  const getItemKey = useCallback((item) => {
    return `sidebar-item-${item.id}`;
  }, []);

  // Animation utilities
  const getCollapseAnimation = useCallback(() => {
    return {
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      transitionProperty: 'width, margin, padding, opacity, transform'
    };
  }, []);

  return {
    // State
    isCollapsed,
    isDesktop,
    isVisible: isDesktop, // Sidebar is only visible on desktop
    
    // Controls
    toggle,
    collapse,
    expand,
    reset,
    
    // Data
    navigationItems,
    
    // Computed values
    sidebarWidth,
    contentMargin,
    
    // CSS classes
    sidebarClasses,
    contentClasses,
    
    // Utilities
    shouldShowLabel,
    getItemKey,
    getCollapseAnimation,
    
    // Responsive info
    breakpoint: {
      isDesktop,
      current: isDesktop ? 'desktop' : 'mobile',
      width: typeof window !== 'undefined' ? window.innerWidth : 0
    }
  };
};