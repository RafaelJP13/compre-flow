import { useLocation, useNavigate } from "react-router-dom";
import { SidebarNavItem } from "./SidebarNavItem";
import { NAV_ITEMS } from "../navItems";

type Props = {
    onNavigate: () => void;
};

export function SidebarNav({ onNavigate }: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className="
                flex flex-col gap-2
                p-3
                flex-1
                overflow-y-auto
            "
        >
            {NAV_ITEMS.map((item) => (
                <SidebarNavItem
                    key={item.path}
                    label={item.label}
                    icon={item.icon}
                    active={location.pathname === item.path}
                    onClick={() => {
                        navigate(item.path);
                        onNavigate();
                    }}
                />
            ))}
        </div>
    );
}
