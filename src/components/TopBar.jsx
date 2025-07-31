import React, { useRef, useEffect } from 'react';
import {
    Menu,
    Bell,
    Search,
    Settings,
    User,
    LogOut,
    Shield,
    HelpCircle,
    ChevronDown,
    X,
    Home,
    Activity,
    Package,
    RefreshCcw
} from 'lucide-react';

import Logo, { LogoVariants } from './Logo';
import { cn, focusRing } from '../utils/cn';
import { ROUTES, USER_ROLES, STATION_STORAGE_KEY, API_ENDPOINTS } from '../constants';
import { useTopbarContext } from '../hooks/topbar/useTopbarContext';
import { useAuth } from '../auth/useAuth';
import api from '../api/users';

/**
 * TopBar Component - Header with mobile navigation dropdown
 * 
 * Features:
 * - Logo and company branding
 * - Mobile navigation dropdown (replaces sidebar on mobile)
 * - Global search functionality
 * - Notifications with badge count
 * - User profile dropdown
 * - Responsive design (mobile-first)
 */

const TopBar = ({
    onLogout = () => { },
    onNavigate = () => { },
    currentPath = '/',
    className = '',
    ...props
}) => {

    const { user, refreshUser } = useAuth();

    const {
        showUserDropdown,
        setShowUserDropdown,
        showNotifications,
        setShowNotifications,
        showSearch,
        setShowSearch,
        showMobileMenu,
        setShowMobileMenu,
        searchQuery,
        setSearchQuery,
        mobileNavItems,
        notifications,
        unreadNotificationsCount
    } = useTopbarContext();

    // Get current page info
    const currentPage = mobileNavItems.find(item =>
        currentPath === item.path ||
        (item.path !== '/' && currentPath.startsWith(item.path + '/'))
    ) || mobileNavItems[0];

    // Refs for click outside detection
    const userDropdownRef = useRef(null);
    const notificationsRef = useRef(null);
    const searchRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setShowMobileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle user logout
    const handleLogout = async () => {
        try {
            await onLogout();
            onNavigate(ROUTES.LOGIN);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Stop impersonation and return to admin view
    const handleStopImpersonation = async () => {
        try {
            await api.post(API_ENDPOINTS.ADMIN.STOP_IMPERSONATION);
            await refreshUser();
            setShowUserDropdown(false);
            onNavigate(ROUTES.ADMIN_USERS);
        } catch (error) {
            console.error('Stop impersonation failed:', error);
        }
    };

    // Handle search
    const handleSearch = () => {
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    // Handle navigation
    const handleNavigate = (itemOrPath) => {
        const path = typeof itemOrPath === 'string' ? itemOrPath : itemOrPath.path;
        if (typeof itemOrPath === 'object' && itemOrPath.station) {
            localStorage.setItem(STATION_STORAGE_KEY, itemOrPath.station);
            onNavigate(`${path}?station=${encodeURIComponent(itemOrPath.station)}`);
            setShowMobileMenu(false);
            return;
        }
        onNavigate(path);
        setShowMobileMenu(false);
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (user?.avatar_initials) return user.avatar_initials;
        if (!user?.full_name) return 'U';
        return user.full_name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header
            className={cn(
                'sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md bg-white/95',
                'transition-all duration-300 shadow-sm',
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3">

                {/* Left Section - Mobile Navigation & Logo */}
                <div className="flex items-center gap-3 sm:gap-4">

                    {/* Mobile Navigation Dropdown - Only visible on mobile */}
                    <div className="lg:hidden relative" ref={mobileMenuRef}>
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className={cn(
                                'flex items-center gap-2 px-3 py-2 rounded-lg',
                                'bg-gray-100 hover:bg-gray-200 transition-colors',
                                'text-gray-700',
                                focusRing
                            )}
                        >
                            <currentPage.icon size={18} />
                            <span className="font-medium text-sm">{currentPage.label}</span>
                            <ChevronDown size={16} className={cn(
                                'transition-transform duration-200',
                                showMobileMenu && 'rotate-180'
                            )} />
                        </button>

                        {/* Mobile Navigation Dropdown */}
                        {showMobileMenu && (
                            <div className="absolute top-12 left-0 bg-white rounded-xl shadow-xl border border-gray-200 min-w-48 py-2 z-50">
                                {mobileNavItems.map((item) => {
                                    const Icon = item.icon;
                                    const currentStation = localStorage.getItem(STATION_STORAGE_KEY);
                                    const isActive = (currentPath === item.path ||
                                        (item.path !== '/' && currentPath.startsWith(item.path + '/')))
                                        && (!item.station || item.station === currentStation);

                                    return (
                                        <button
                                            key={item.station || item.path}
                                            onClick={() => handleNavigate(item)}
                                            className={cn(
                                                'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                                                isActive
                                                    ? 'bg-brand-361 text-white'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            )}
                                        >
                                            <Icon size={18} />
                                            <span className="flex-1 font-medium">{item.label}</span>
                                            {item.badge && (
                                                <span className={cn(
                                                    'px-2 py-0.5 text-xs font-semibold rounded-full',
                                                    isActive
                                                        ? 'bg-white/20 text-white'
                                                        : 'bg-brand-376 text-white'
                                                )}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Logo */}
                    <button
                        onClick={() => handleNavigate(ROUTES.DASHBOARD)}
                        className={cn(
                            'flex items-center transition-transform duration-200 hover:scale-105',
                            focusRing,
                            'rounded-lg'
                        )}
                    >
                        <LogoVariants.Header />
                    </button>
                </div>

                {/* Right Section - Actions & User */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Search - Hidden on very small screens */}
                    <div className="relative hidden xs:block" ref={searchRef}>
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className={cn(
                                'p-2 rounded-lg transition-all duration-200',
                                'hover:bg-gray-100 text-brand-gray hover:text-brand-349',
                                focusRing
                            )}
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>

                        {/* Search Dropdown */}
                        {showSearch && (
                            <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-200 w-80 max-w-[90vw] p-4 z-50">
                                <div className="space-y-3">
                                    <div className="relative">
                                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder="Search production, reports, users..."
                                            className={cn(
                                                'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm',
                                                'focus:ring-2 focus:ring-brand-361/40 focus:border-brand-361',
                                                'transition-colors duration-200'
                                            )}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span>Press Enter to search</span>
                                        <button
                                            type="button"
                                            onClick={() => setShowSearch(false)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Notifications */}
                    <div className="relative" ref={notificationsRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={cn(
                                'relative p-2 rounded-lg transition-all duration-200',
                                'hover:bg-gray-100 text-brand-gray hover:text-brand-349',
                                focusRing
                            )}
                            aria-label={`Notifications ${unreadNotificationsCount > 0 ? `(${unreadNotificationsCount} unread)` : ''}`}
                        >
                            <Bell size={20} />
                            {unreadNotificationsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">
                                    {unreadNotificationsCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-200 w-80 max-w-[90vw] max-h-96 overflow-y-auto z-50">
                                <div className="p-4 border-b border-gray-200 bg-brand-gradient bg-opacity-5">
                                    <h3 className="font-semibold text-brand-349">Notifications</h3>
                                    <p className="text-xs text-brand-gray mt-1">{unreadNotificationsCount} unread</p>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={cn(
                                                'p-4 hover:bg-gray-50 transition-colors cursor-pointer',
                                                !notification.read && 'bg-blue-50/50'
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-medium text-sm text-brand-349 pr-2">{notification.title}</h4>
                                                <span className="text-xs text-gray-500 flex-shrink-0">{notification.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                            <div className="flex justify-between items-center">
                                                <span className={cn(
                                                    'inline-block px-2 py-0.5 text-xs rounded-full font-medium',
                                                    {
                                                        'bg-yellow-100 text-yellow-800': notification.type === 'warning',
                                                        'bg-blue-100 text-blue-800': notification.type === 'info',
                                                        'bg-green-100 text-green-800': notification.type === 'success'
                                                    }
                                                )}>
                                                    {notification.type}
                                                </span>
                                                {!notification.read && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-200 bg-gray-50">
                                    <button
                                        onClick={() => {
                                            handleNavigate('/notifications');
                                            setShowNotifications(false);
                                        }}
                                        className="text-sm text-brand-361 hover:text-brand-349 font-medium w-full text-center"
                                    >
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Menu */}
                    <div className="relative" ref={userDropdownRef}>
                        <button
                            onClick={() => setShowUserDropdown(!showUserDropdown)}
                            className={cn(
                                'flex items-center gap-2 p-1 rounded-lg transition-all duration-200',
                                'hover:bg-gray-100',
                                focusRing
                            )}
                            aria-label="User menu"
                        >
                            <div className="w-8 h-8 rounded-full bg-brand-361 text-white flex items-center justify-center font-semibold text-sm">
                                {getUserInitials()}
                            </div>
                            <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
                        </button>

                        {/* User Dropdown */}
                        {showUserDropdown && (
                            <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-200 min-w-56 py-2 z-50">

                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-100 bg-brand-gradient bg-opacity-5">
                                    <div className="font-medium text-brand-349">{user?.full_name || 'User'}</div>
                                    <div className="text-sm text-gray-500">{user?.username}</div>
                                    <div className="text-xs text-brand-361 font-medium mt-1 capitalize">
                                        {user?.role} Access
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            handleNavigate(ROUTES.SETTINGS);
                                            setShowUserDropdown(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                                    >
                                        <User size={16} />
                                        Profile Settings
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleNavigate(ROUTES.SETTINGS);
                                            setShowUserDropdown(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                                    >
                                        <Settings size={16} />
                                        Preferences
                                    </button>

                                    {user?.role === USER_ROLES.ADMIN && (
                                        <button
                                            onClick={() => {
                                                handleNavigate(ROUTES.ADMIN);
                                                setShowUserDropdown(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                                        >
                                            <Shield size={16} />
                                            Admin Panel
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            handleNavigate('/help');
                                            setShowUserDropdown(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                                    >
                                    <HelpCircle size={16} />
                                        Help & Support
                                    </button>

                                    {user?.role !== USER_ROLES.ADMIN && (
                                        <button
                                            onClick={handleStopImpersonation}
                                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                                        >
                                            <RefreshCcw size={16} />
                                            Return to Admin
                                        </button>
                                    )}
                                </div>

                                {/* Logout */}
                                <div className="border-t border-gray-100 py-1">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;