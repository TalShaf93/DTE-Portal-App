
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/users';
import { API_ENDPOINTS, AUTH_STORAGE_KEYS, FEATURES } from '../constants';


/**
 * AuthProvider handles user authentication state.
 * It loads the current user on mount and exposes
 * login and logout helpers to child components.
 */
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  const loadBypassUser = () => {
    const data = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const saveBypassUser = (data) => {
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(data));
  };

  const clearBypassUser = () => {
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
  };

  // ------------------------------------------------------------------
  // Fetch current user on mount
  // ------------------------------------------------------------------
  useEffect(() => {
    const init = async () => {
      if (FEATURES.AUTH_BYPASS) {
        const stored = loadBypassUser();
        if (stored) setUser(stored);
        setLoading(false);
        return;
      }
      try {
        const data = await api.get(API_ENDPOINTS.AUTH.CURRENT_USER);
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }

    };
    init();
  }, []);

  // ------------------------------------------------------------------
  // Login
  // ------------------------------------------------------------------
  const login = async (username, password) => {
    setLoading(true);

    if (FEATURES.AUTH_BYPASS) {
      let bypassUser = null;
      const u = username.trim().toLowerCase();
      if (u === 'admin' && password.trim() === '12345') {
        bypassUser = {
          id: 'local-admin',
          username: 'admin',
          full_name: 'Admin User',
          role: 'admin',
        };
      } else if (u === 'pworker' && password.trim() === 'worker') {
        bypassUser = {
          id: 'local-pworker',
          username: 'pworker',
          full_name: 'Production Worker',
          role: 'pworker',
        };
      }
      if (!bypassUser) {
        setLoading(false);
        throw new Error('Invalid credentials');
      }
      setUser(bypassUser);
      saveBypassUser(bypassUser);
      setLoading(false);
      return;
    }

    try {
      const { user: loggedIn } = await api.post(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          username,
          password,
        },
      );

      setUser(loggedIn);
    } finally {
      setLoading(false);
    }

  };

  // ------------------------------------------------------------------
  // Logout
  // ------------------------------------------------------------------
  const logout = async () => {
    if (FEATURES.AUTH_BYPASS) {
      clearBypassUser();
      setUser(null);
      return;
    }

    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      setUser(null);
    }
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
