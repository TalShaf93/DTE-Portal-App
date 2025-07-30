import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ roles }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className="p-6 text-center text-brand-349">Loading…</div>
        );
    }
    if (!user) return <Navigate to="/login" replace />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
    return <Outlet />;
};