import type { LucideIcon } from "lucide-react";

type Props = {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: LucideIcon;
};

export function LoginIconField({
    label,
    type,
    placeholder,
    value,
    onChange,
    icon: Icon,
}: Props) {
    return (
        <div>
            <label className="text-sm text-zinc-300 mb-2 block">
                {label}
            </label>

            <div className="relative">
                <Icon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-black outline-none focus:ring-2 focus:ring-white"
                />
            </div>
        </div>
    );
}
