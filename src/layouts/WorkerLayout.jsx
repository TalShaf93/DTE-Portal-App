import React from 'react';
import TopBar from '../components/TopBar';
import { cn } from '../utils/cn';
import { TopbarProvider } from '../hooks/topbar/TopbarProvider';
import { useAuth } from '../auth/useAuth';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const WorkerLayout = ({ className = '', ...props }) => {
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
        <TopBar
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          currentPath={pathname}
        />
        <main
          className={cn(
            'transition-all duration-300',
            'min-h-[calc(100vh-73px)]'
          )}
        >
          <div className="p-6">
            <Outlet />
          </div>

        </main>
      </TopbarProvider>
    </div>
  );
};

export default WorkerLayout;
