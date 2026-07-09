import { Outlet } from "react-router-dom";

import { MobileTopBar } from "./components/MobileTopBar";
import { Sidebar } from "./components/Sidebar";
import { MobileBackdrop } from "./components/MobileBackdrop";

import { useDashboardLayout } from "./hooks/useDashboardLayout";

const user = {
    name: "Rafael",
    email: "rafael@compre-mais.com",
};

export function DashboardLayout() {
    const { open, setOpen, handleLogout } = useDashboardLayout();

    return (
        <div className="min-h-screen flex items-stretch bg-neutral-100 overflow-x-hidden">
            <MobileTopBar onOpenMenu={() => setOpen(true)} />

            <Sidebar
                open={open}
                onNavigate={() => setOpen(false)}
                user={user}
                onLogout={handleLogout}
            />

            {open && <MobileBackdrop onClick={() => setOpen(false)} />}

            <main
                className="
                    flex-1
                    p-6
                    pt-20
                    md:pt-6
                    w-full
                    overflow-x-hidden
                "
            >
                <Outlet />
            </main>
        </div>
    );
}
