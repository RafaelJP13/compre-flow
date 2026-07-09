import { ClipboardList, LayoutDashboard, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItemConfig = {
    label: string;
    path: string;
    icon: LucideIcon;
};

export const NAV_ITEMS: NavItemConfig[] = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Empresas", path: "/companies", icon: User },
    { label: "Usuários", path: "/users", icon: ClipboardList },
];
