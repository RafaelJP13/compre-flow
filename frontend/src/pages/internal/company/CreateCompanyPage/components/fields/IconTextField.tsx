import type { LucideIcon } from "lucide-react";

type Props = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    icon: LucideIcon;
};

export function IconTextField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    icon: Icon,
}: Props) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <div className="relative">
                <Icon
                    size={18}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                />

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="
                        w-full
                        pl-12
                        pr-4
                        py-3
                        rounded-2xl
                        border border-gray-200
                        outline-none
                        focus:ring-4
                        focus:ring-[#ffac2e]/20
                        focus:border-[#ffac2e]
                    "
                />
            </div>
        </div>
    );
}
