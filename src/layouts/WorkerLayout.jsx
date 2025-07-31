import React from 'react';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import { cn } from '../utils/cn';
import { SidebarProvider } from '../hooks/sidebar/SidebarProvider';
import { TopbarProvider } from '../hooks/topbar/TopbarProvider';
import { useAuth } from '../auth/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const WorkerLayout = ({ children, className = '', ...props }) => {
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
          <TopBar
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            currentPath={pathname}
          />
          <Sidebar onNavigate={handleNavigate} currentPath={pathname} />

          <main
            className={cn(
              'transition-all duration-300',
              'min-h-[calc(100vh-73px)]',
              'lg:ml-64'
            )}
          >
            <div className="p-6 max-w-4xl mx-auto">{children}</div>
          </main>
        </SidebarProvider>
      </TopbarProvider>
    </div>
  );
};

export default WorkerLayout;
