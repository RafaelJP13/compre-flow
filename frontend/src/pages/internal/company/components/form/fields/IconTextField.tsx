import type { LucideIcon } from "lucide-react";

type Props = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    icon: LucideIcon;
    className?: string;
    disabled?: boolean;
    error?: string;
};

export function IconTextField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    icon: Icon,
    className,
    disabled,
    error,
}: Props) {
    return (
        <div className={className}>
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
                    disabled={disabled}
                    className={`
                        w-full
                        pl-12
                        pr-4
                        py-3
                        rounded-2xl
                        border
                        outline-none
                        focus:ring-4
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:cursor-not-allowed
                        ${error
                            ? "border-red-400 focus:ring-red-400/20 focus:border-red-400"
                            : "border-gray-200 focus:ring-[#ffac2e]/20 focus:border-[#ffac2e]"
                        }
                    `}
                />
            </div>

            {error && (
                <p className="mt-1.5 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
