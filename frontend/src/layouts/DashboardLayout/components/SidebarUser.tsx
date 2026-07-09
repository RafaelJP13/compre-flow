import { User, LogOut } from "lucide-react";

type Props = {
    name: string;
    email: string;
    onLogout: () => void;
};

export function SidebarUser({ name, email, onLogout }: Props) {
    return (
        <div className="p-3 border-t space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} />

                <div className="leading-tight">
                    <p className="font-medium text-gray-800">{name}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                </div>
            </div>

            <button
                onClick={onLogout}
                className="
                    flex items-center gap-2
                    text-sm
                    text-red-600
                    hover:bg-red-50
                    px-2 py-2
                    rounded-md
                    w-full
                    cursor-pointer
                "
            >
                <LogOut size={16} />
                Logout
            </button>
        </div>
    );
}
