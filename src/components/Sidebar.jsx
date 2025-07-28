import React from 'react';
import { Home, Activity, Package, Shield, CheckCircle, Wrench, BarChart3 } from 'lucide-react';
import { cn, focusRing } from '../utils/cn';
import { useSidebarContext } from '../hooks/sidebar/useSidebarContext';

/**
 * Sidebar Component - Desktop only navigation
 * 
 * Features:
 * - Desktop only (completely hidden on mobile/tablet)
 * - Always visible on desktop
 * - Simplified menu structure
 * - Clear active state indication
 * - Full height sidebar
 */

const Sidebar = ({
    onNavigate = () => { },
    currentPath = '/',
    className = '',
    ...props
}) => {
    const { navigationItems } = useSidebarContext();

    const iconMap = {
        Home,
        Activity,
        Package,
        Shield,
        CheckCircle,
        Wrench,
        BarChart3
    };

    // Handle navigation
    const handleNavigate = (path) => {
        onNavigate(path);
    };

    return (
        <aside
            className={cn(
                // Base styles - full height sidebar, desktop only
                'hidden md:block sm:block', // Completely hidden on mobile/tablet
                'fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white border-r border-gray-200 z-30',
                'w-64',

                className
            )}
            {...props}
        >
            {/* Navigation Menu */}
            <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
                {navigationItems.map((item) => {
                    const Icon = iconMap[item.icon] || Home;
                    const isActive = currentPath === item.path ||
                        (item.path !== '/' && currentPath.startsWith(item.path + '/'));

                    return (
                        <button
                            key={item.path}
                            onClick={() => handleNavigate(item.path)}
                            className={cn(
                                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left',
                                'transition-all duration-200 group relative',
                                focusRing,
                                {
                                    // Active state - much more visible
                                    'bg-brand-361 text-white shadow-md border-l-4 border-brand-349': isActive,
                                    // Inactive state  
                                    'text-gray-700 hover:bg-brand-gradient hover:bg-opacity-10 hover:text-brand-361': !isActive
                                }
                            )}
                        >
                            {/* Active indicator bar */}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-349 rounded-r-full" />
                            )}

                            {/* Icon */}
                            <Icon
                                size={20}
                                className={cn(
                                    'flex-shrink-0 transition-all duration-200',
                                    isActive ? 'text-white' : 'text-gray-600 group-hover:text-brand-361'
                                )}
                            />

                            {/* Label */}
                            <span className="flex-1 font-medium">
                                {item.label}
                            </span>

                            {/* Badge */}
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
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>System Online</span>
                    <span className="ml-auto text-xs">v1.0.0</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
