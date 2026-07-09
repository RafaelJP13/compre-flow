import type { LucideIcon } from "lucide-react";

type Props = {
    label: string;
    icon: LucideIcon;
    active: boolean;
    onClick: () => void;
};

export function SidebarNavItem({ label, icon: Icon, active, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-3
                px-3 py-2
                rounded-md
                transition
                w-full
                text-left
                cursor-pointer
                ${active ? "bg-black text-white" : "hover:bg-gray-200 text-gray-700"}
            `}
        >
            <Icon size={18} />
            {label}
        </button>
    );
}
