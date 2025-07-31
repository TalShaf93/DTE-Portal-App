import React from 'react';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import { cn } from '../utils/cn';
import { SidebarProvider } from '../hooks/sidebar/SidebarProvider';
import { TopbarProvider } from '../hooks/topbar/TopbarProvider';
import { useAuth } from '../auth/useAuth';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

/**
 * DashboardLayout Component - Mobile-first responsive layout
 * 
 * Features:
 * - Mobile: TopBar with dropdown menu, no sidebar
 * - Desktop: TopBar + always visible sidebar
 * - Responsive content area
 * - Simplified navigation structure
 */

const DashboardLayout = ({ className = '', ...props }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleNavigate = (path) => navigate(path);
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className={cn('min-h-screen bg-gray-50', className)} {...props}>
            <TopbarProvider>
                <SidebarProvider>
                    {/* TopBar - Always at the top with mobile navigation */}
                    <TopBar
                        onLogout={handleLogout}
                        onNavigate={handleNavigate}
                        currentPath={pathname}
                    />

                    {/* Sidebar - Desktop only (completely hidden on mobile) */}
                    <Sidebar
                        onNavigate={handleNavigate}
                        currentPath={pathname}
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
                            <Outlet />
                        </div>
                    </main>
                </SidebarProvider>
            </TopbarProvider>
        </div>
    );
};

export default DashboardLayout;

