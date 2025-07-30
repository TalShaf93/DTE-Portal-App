import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/users";

import { API_ENDPOINTS, AUTH_STORAGE_KEYS, FEATURES } from "../constants";


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        if (FEATURES.AUTH_BYPASS) {
            const stored = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
            if (stored) {
                try {
                    setUser(JSON.parse(stored));
                } catch {
                    setUser(null);
                }
            }
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

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const login = async (username, password) => {
        setLoading(true);

        if (FEATURES.AUTH_BYPASS) {
            const ok = username === 'admin' && password === '12345';
            if (!ok) {
                setLoading(false);
                throw new Error('Invalid credentials');
            }
            const bypassUser = {
                id: 'local-admin',
                username: 'admin',
                full_name: 'Admin User',
                role: 'admin'
            };
            setUser(bypassUser);
            localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(bypassUser));
            setLoading(false);
            return;
        }

        const { user: loggedIn } = await api.post(API_ENDPOINTS.AUTH.LOGIN, { username, password });
        setUser(loggedIn);
        setLoading(false);
    };

    const logout = async () => {

        if (FEATURES.AUTH_BYPASS) {
            localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
            setUser(null);
            return;
        }
        try {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};