import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    // null | { email, role }
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Dummy login – resolves if credentials match hard‑coded admin user.
     * @param {string} email
     * @param {string} password
     */
    const login = (email, password) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const ok = (email === "admin" || email === "admin@danenergy.com") && password === "12345";
                if (ok) {
                    setUser({ email, role: "admin" });
                    setLoading(false);
                    resolve();
                } else {
                    setLoading(false);
                    reject(new Error("Invalid credentials"));
                }
            }, 400); // small delay for UX
        });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};