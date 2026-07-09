import { SidebarLogo } from "./SidebarLogo";
import { SidebarNav } from "./SidebarNav";
import { SidebarUser } from "./SidebarUser";

type Props = {
    open: boolean;
    onNavigate: () => void;
    user: { name: string; email: string };
    onLogout: () => void;
};

export function Sidebar({ open, onNavigate, user, onLogout }: Props) {
    return (
        <aside
            className={`
                fixed md:static
                top-0 left-0
                min-h-screen
                w-64
                bg-white
                border
                border-gray-200
                rounded-r-3xl
                shadow-sm
                flex
                flex-col
                z-50
                transition-transform
                duration-300
                m-2
                ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
        >
            <SidebarLogo />
            <SidebarNav onNavigate={onNavigate} />
            <SidebarUser
                name={user.name}
                email={user.email}
                onLogout={onLogout}
            />
        </aside>
    );
}
