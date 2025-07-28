import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/users";
import { API_ENDPOINTS } from "../constants";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
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
        const { user: loggedIn } = await api.post(API_ENDPOINTS.AUTH.LOGIN, { username, password });
        setUser(loggedIn);
        setLoading(false);
    };

    const logout = async () => {
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