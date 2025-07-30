import React from 'react';
import TopBar from '../components/TopBar';
import { cn } from '../utils/cn';
import { TopbarProvider } from '../hooks/topbar/TopbarProvider';

const WorkerLayout = ({
  children,
  onLogout = () => {},
  onNavigate = () => {},
  currentPath = '/',
  className = '',
  ...props
}) => {
  return (
    <div className={cn('min-h-screen bg-gray-50', className)} {...props}>
      <TopbarProvider>
        <TopBar
          onLogout={onLogout}
          onNavigate={onNavigate}
          currentPath={currentPath}
        />
        <main className="pt-[73px]">
          <div className="p-6 max-w-4xl mx-auto">{children}</div>
        </main>
      </TopbarProvider>
    </div>
  );
};

export default WorkerLayout;
