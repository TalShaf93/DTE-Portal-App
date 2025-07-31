/**
 * Dan-Tech Energy Platform - Application Constants
 * 
 * Centralized configuration and constants for the entire application.
 * This file contains all static values, configurations, and enums
 * used throughout the Dan-Tech Energy management platform.
 */

// =====================================================
// APPLICATION METADATA
// =====================================================

export const APP_INFO = {
  name: 'Dan-Tech Energy Platform',
  shortName: 'Dan-Tech',
  version: '1.0.0',
  description: 'Energy Management & Production Platform',
  company: 'Dan-Tech Energy GmbH',
  tagline: 'Energy Outside the Box',
  website: 'https://dantech-energy.com'
};

// =====================================================
// AUTHENTICATION & ROLES
// =====================================================

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  PWORKER: 'pworker',
  VIEWER: 'viewer'
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    'users.create',
    'users.read',
    'users.update',
    'users.delete',
    'system.backup',
    'system.config',
    'production.control',
    'analytics.full'
  ],
  [USER_ROLES.MANAGER]: [
    'users.read',
    'production.control',
    'analytics.full',
    'reports.create',
    'scheduling.manage'
  ],
  [USER_ROLES.OPERATOR]: [
    'production.monitor',
    'production.operate',
    'analytics.basic',
    'inventory.update'
  ],
  [USER_ROLES.PWORKER]: [
    'production.worker'
  ],
  [USER_ROLES.VIEWER]: [
    'analytics.basic',
    'reports.view',
    'production.monitor'
  ]
};

export const AUTH_STORAGE_KEYS = {
  TOKEN: 'dantech_auth_token',
  REFRESH_TOKEN: 'dantech_refresh_token',
  USER: 'dantech_user_data',
  PREFERENCES: 'dantech_user_preferences'
};

// =====================================================
// NAVIGATION & ROUTING
// =====================================================

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  WORKER: '/worker',
  
  // Production
  PRODUCTION: '/production',
  PRODUCTION_LINES: '/production/lines',
  PRODUCTION_ORDERS: '/production/orders',
  PRODUCTION_QUALITY: '/production/quality',
  
  // Analytics
  ANALYTICS: '/analytics',
  ANALYTICS_PERFORMANCE: '/analytics/performance',
  ANALYTICS_EFFICIENCY: '/analytics/efficiency',
  ANALYTICS_ENERGY: '/analytics/energy',
  
  // Inventory
  INVENTORY: '/inventory',
  INVENTORY_MATERIALS: '/inventory/materials',
  INVENTORY_COMPONENTS: '/inventory/components',
  
  // Workforce
  WORKFORCE: '/workforce',
  WORKFORCE_SCHEDULE: '/workforce/schedule',
  WORKFORCE_TASKS: '/workforce/tasks',
  
  // Management
  SCHEDULING: '/scheduling',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  
  // Admin
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_SYSTEM: '/admin/system',
  ADMIN_BACKUP: '/admin/backup',
  ADMIN_LOGS: '/admin/logs',
  
  // Error pages
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500'
};

export const NAVIGATION_SECTIONS = [
  {
    title: 'Main',
    items: [
      {
        label: 'Dashboard',
        path: ROUTES.DASHBOARD,
        icon: 'Home',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.OPERATOR, USER_ROLES.VIEWER]
      },
      {
        label: 'Production',
        path: ROUTES.PRODUCTION,
        icon: 'Activity',
        badge: 'Live',
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.OPERATOR]
      },
      {
        label: 'Inventory',
        path: ROUTES.INVENTORY,
        icon: 'Package',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.OPERATOR]
      },
      {
        label: 'Workforce',
        path: ROUTES.WORKFORCE,
        icon: 'Users',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER]
      }
    ]
  },
  {
    title: 'Analytics',
    items: [
      {
        label: 'Performance',
        path: ROUTES.ANALYTICS_PERFORMANCE,
        icon: 'BarChart3',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.OPERATOR, USER_ROLES.VIEWER]
      },
      {
        label: 'Efficiency',
        path: ROUTES.ANALYTICS_EFFICIENCY,
        icon: 'TrendingUp',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.VIEWER]
      },
      {
        label: 'Energy Flow',
        path: ROUTES.ANALYTICS_ENERGY,
        icon: 'Zap',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.OPERATOR]
      }
    ]
  },
  {
    title: 'Management',
    items: [
      {
        label: 'Scheduling',
        path: ROUTES.SCHEDULING,
        icon: 'Calendar',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER]
      },
      {
        label: 'Reports',
        path: ROUTES.REPORTS,
        icon: 'FileText',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.VIEWER]
      },
      {
        label: 'Settings',
        path: ROUTES.SETTINGS,
        icon: 'Settings',
        badge: null,
        roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.OPERATOR]
      }
    ]
  },
  {
    title: 'Admin',
    items: [
      {
        label: 'User Management',
        path: ROUTES.ADMIN_USERS,
        icon: 'Shield',
        badge: null,
        roles: [USER_ROLES.ADMIN]
      },
      {
        label: 'System Health',
        path: ROUTES.ADMIN_SYSTEM,
        icon: 'Database',
        badge: null,
        roles: [USER_ROLES.ADMIN]
      }
    ]
  }
];

// =====================================================
// PRODUCTION & OPERATIONS
// =====================================================

export const PRODUCTION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  ERROR: 'error',
  SETUP: 'setup'
};

export const PRODUCTION_LINES = {
  LINE_A: 'line_a',
  LINE_B: 'line_b',
  QUALITY_CONTROL: 'quality_control',
  PACKAGING: 'packaging'
};

export const PRODUCTION_STATIONS = {
  INITIAL_ASSEMBLY: 'Initial Assembly',
  WELDING: 'Welding',
  SOLDERING: 'Soldering',
  FIRMWARE_VALIDATION: 'Firmware & Validation',
  FINAL_ASSEMBLY: 'Final Assembly'
};

export const STATION_STORAGE_KEY = 'dantech_last_station';

export const WORKSPACES = [
  {
    id: 'production_kiryat',
    name: 'Production Facility',
    location: 'Kiryat Shmona',
    type: 'production',
    isDefault: true
  },
  {
    id: 'rd_telaviv',
    name: 'R&D Center',
    location: 'Tel Aviv',
    type: 'research'
  },
  {
    id: 'warehouse_haifa',
    name: 'Warehouse',
    location: 'Haifa',
    type: 'warehouse'
  }
];

export const BATTERY_TYPES = {
  LITHIUM_ION: 'lithium_ion',
  LITHIUM_POLYMER: 'lithium_polymer',
  NICKEL_METAL_HYDRIDE: 'nickel_metal_hydride',
  LEAD_ACID: 'lead_acid'
};

export const QUALITY_METRICS = {
  EFFICIENCY: 'efficiency',
  CAPACITY: 'capacity',
  CYCLE_LIFE: 'cycle_life',
  SAFETY: 'safety',
  TEMPERATURE_STABILITY: 'temperature_stability'
};

// =====================================================
// STATUS & NOTIFICATIONS
// =====================================================

export const STATUS_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  PENDING: 'pending'
};

export const NOTIFICATION_TYPES = {
  SYSTEM: 'system',
  PRODUCTION: 'production',
  MAINTENANCE: 'maintenance',
  QUALITY: 'quality',
  SECURITY: 'security'
};

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// =====================================================
// DATA & API CONFIGURATION
// =====================================================

export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://192.168.10.15:5000/api',

  // Authentication
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    CURRENT_USER: '/current-user'
  },

  // Projects & dashboard
  PROJECTS: '/projects',
  PROJECT_SUBITEMS: (id) => `/project/${id}/subitems`,
  SUBITEM_ASSETS: (projectId, subitemId) =>
    `/project/${projectId}/subitem/${subitemId}/assets`,

  // Workflow
  SCAN_BATTERY: '/scan-battery',
  STATION_CHECKLIST: (station) => `/station/${station}/checklist`,
  COMPLETE_STATION: '/complete-station',

  // Failures & files
  REPORT_FAILURE: '/report-failure',
  UPLOAD_FILE: '/upload-file',

  // Admin
  ADMIN: {
    USERS: '/admin/users',
    USER: (id) => `/admin/users/${id}`,
    IMPERSONATE: (id) => `/admin/impersonate/${id}`,
    STOP_IMPERSONATION: '/admin/stop-impersonation',
    ANALYTICS: '/admin/analytics',
    RELOAD_USERS: '/admin/reload-users'
  },

  // System
  HEALTH: '/health',
  CLEAR_CACHE: '/system/cache/clear'
};

export const REQUEST_TIMEOUT = 30000; // 30 seconds
export const RETRY_ATTEMPTS = 3;
export const POLLING_INTERVALS = {
  PRODUCTION_STATUS: 5000,    // 5 seconds
  SYSTEM_HEALTH: 30000,       // 30 seconds
  NOTIFICATIONS: 10000        // 10 seconds
};

// =====================================================
// UI CONFIGURATION
// =====================================================

export const THEME_CONFIG = {
  SIDEBAR_WIDTH: 280,
  SIDEBAR_COLLAPSED_WIDTH: 64,
  HEADER_HEIGHT: 73,
  MOBILE_BREAKPOINT: 768
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
};

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: 'yyyy-MM-dd HH:mm:ss'
};

export const CHART_COLORS = {
  PRIMARY: '#79B652',
  SECONDARY: '#A8C94B',
  ACCENT: '#1F6F3B',
  SUCCESS: '#2ECC71',
  WARNING: '#F1C40F',
  ERROR: '#E74C3C',
  GRAY: '#7F7E82'
};

// =====================================================
// VALIDATION RULES
// =====================================================

export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL: true
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PHONE: {
    REGEX: /^\+?[\d\s\-()]{10,}$/
  }
};

// =====================================================
// ERROR MESSAGES
// =====================================================

export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  VALIDATION_FAILED: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.'
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in',
  LOGOUT: 'Successfully logged out',
  SAVE: 'Changes saved successfully',
  CREATE: 'Item created successfully',
  UPDATE: 'Item updated successfully',
  DELETE: 'Item deleted successfully'
};

// =====================================================
// FEATURE FLAGS
// =====================================================

export const FEATURES = {
  DARK_MODE: import.meta.env.VITE_FEATURE_DARK_MODE === 'true',
  ANALYTICS_EXPORT: import.meta.env.VITE_FEATURE_ANALYTICS_EXPORT === 'true',
  REAL_TIME_NOTIFICATIONS: import.meta.env.VITE_FEATURE_REAL_TIME === 'true',
  ADVANCED_REPORTING: import.meta.env.VITE_FEATURE_ADVANCED_REPORTS === 'true',
  AUTH_BYPASS: import.meta.env.VITE_AUTH_BYPASS === 'true'
};

// =====================================================
// EXPORT DEFAULT GROUPED CONSTANTS
// =====================================================

export default {
  APP_INFO,
  USER_ROLES,
  ROLE_PERMISSIONS,
  ROUTES,
  NAVIGATION_SECTIONS,
  PRODUCTION_STATUS,
  WORKSPACES,
  STATUS_TYPES,
  PRODUCTION_STATIONS,
  STATION_STORAGE_KEY,
  API_ENDPOINTS,
  THEME_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURES
};