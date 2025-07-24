import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, Users, Factory } from "lucide-react";
import clsx from "clsx";

const links = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/production", label: "Production", icon: Factory },
    { to: "/inventory", label: "Inventory", icon: Package },
    { to: "/admin", label: "Admin", icon: Users, roles: ["admin"] },
];

export default function Sidebar({ role }) {
    return (
        <aside className="hidden md:block w-56 bg-gradient-to-b from-grad-start to-grad-end p-4">
            <nav className="space-y-2">
                {links.map(({ to, label, icon: Icon, roles }) => {
                    if (roles && !roles.includes(role)) return null;
                    console.log(Icon)
                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                clsx(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                                    isActive
                                        ? "bg-white text-brand-349"
                                        : "text-white/85 hover:bg-white/10"
                                )
                            }
                        >
                            <Icon size={18} strokeWidth={1.8} />
                            <span>{label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}