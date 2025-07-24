import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
    const { user } = useAuth();
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar role={user?.role} />
            <div className="flex flex-col flex-1">
                <TopBar />
                <main className="flex-1 overflow-y-auto bg-[linear-gradient(135deg,#C0EBD8_0%,#E1FEC1_100%)] p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}