import React from 'react';
import TopBar from '../components/TopBar';
import { cn } from '../utils/cn';
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
        <TopBar
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          currentPath={pathname}
        />
        <main className="pt-[73px]">
          <div className="p-6 max-w-4xl mx-auto">{children}</div>
        </main>
      </TopbarProvider>
    </div>
  );
};

export default WorkerLayout;
