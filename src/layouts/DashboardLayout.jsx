import React from 'react';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import { cn } from '../utils/cn';

/**
 * DashboardLayout Component - Mobile-first responsive layout
 * 
 * Features:
 * - Mobile: TopBar with dropdown menu, no sidebar
 * - Desktop: TopBar + always visible sidebar
 * - Responsive content area
 * - Simplified navigation structure
 */

const DashboardLayout = ({
    children,
    user = { name: 'Tal Shafir', email: 'tal@dantech-energy.com', role: 'admin' },
    onLogout = () => { },
    onNavigate = () => { },
    currentPath = '/',
    className = '',
    ...props
}) => {

    return (
        <div className={cn('min-h-screen bg-gray-50', className)} {...props}>
            {/* TopBar - Always at the top with mobile navigation */}
            <TopBar
                user={user}
                onLogout={onLogout}
                onNavigate={onNavigate}
                currentPath={currentPath}
            />

            {/* Sidebar - Desktop only (completely hidden on mobile) */}
            <Sidebar
                onNavigate={onNavigate}
                currentPath={currentPath}
                user={user}
            />

            {/* Main Content Area */}
            <main
                className={cn(
                    'transition-all duration-300',
                    'min-h-[calc(100vh-73px)]', // Full height minus TopBar
                    // Desktop: add left margin for sidebar, Mobile: full width
                    'lg:ml-64'
                )}
            >
                {/* Content Wrapper with Proper Padding */}
                <div className="p-6 max-w-7xl mx-auto">
                    {/* Render page content */}
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;

