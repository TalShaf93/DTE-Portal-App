import { useState, useMemo } from 'react';
import { Home, Activity, Package, Shield } from 'lucide-react';
import { useAuth } from '../../auth/useAuth';
import { PRODUCTION_STATIONS } from '../../constants';

export const useTopbar = () => {
  const { user } = useAuth();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, title: 'Production Alert', message: 'Line A efficiency dropped to 89%', type: 'warning', time: '5m ago', read: false },
    { id: 2, title: 'Maintenance Scheduled', message: 'Line B maintenance tomorrow 9:00 AM', type: 'info', time: '1h ago', read: false },
    { id: 3, title: 'Quality Check Complete', message: 'Batch #2024-001 passed all tests', type: 'success', time: '2h ago', read: true }
  ]);

  const mobileNavItems = useMemo(() => {
    const items = [
      { icon: Home, label: 'Dashboard', path: '/', roles: ['admin', 'manager', 'operator', 'viewer'] },
      { icon: Activity, label: 'Production', path: '/production', badge: 'Live', roles: ['admin', 'manager', 'operator'] },
      { icon: Package, label: 'Inventory', path: '/inventory', roles: ['admin', 'manager', 'operator'] },
      { icon: Shield, label: 'User Management', path: '/admin/users', roles: ['admin'] }
    ];

    if (!user) return [];

    if (user.role === 'pworker') {
      return Object.entries(PRODUCTION_STATIONS).map(([key, label]) => ({
        id: `station-${key.toLowerCase()}`,
        icon: Activity,
        label,
        path: '/worker',
        roles: ['pworker'],
        station: label,
      }));
    }

    return items.filter(item => item.roles.includes(user.role));
  }, [user]);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications]
  );

  return {
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
  };
};
