import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  if (user?.role === 'pworker') {
    return <Navigate to="/worker" replace />;
  }
  return <div className="p-6 text-brand-349">Welcome to Dan‑Tech Portal 👋</div>;
}