import React from "react";
import { useAuth } from "../auth/useAuth";
import Logo from "./Logo";
import { LogOut } from "lucide-react";

const TopBar = () => {
    const { user, logout } = useAuth();
    return (
        <header className="flex items-center justify-between px-4 h-14 shadow-sm bg-white">
            <div className="flex items-center gap-2">
                <Logo className="w-6 h-6" />
                <span className="font-semibold text-brand-349">Dan‑Tech Portal</span>
            </div>
            {user && (
                <button
                    onClick={logout}
                    className="inline-flex items-center gap-1 text-sm text-brand-349 hover:text-brand-361"
                >
                    <LogOut size={16} /> Logout
                </button>
            )}
        </header>
    );
};
export default TopBar;