type Props = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    className?: string;
    error?: string;
};

export function TextField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    className,
    error,
}: Props) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    w-full
                    px-4 py-3
                    rounded-2xl
                    border
                    outline-none
                    focus:ring-4
                    ${error
                        ? "border-red-400 focus:ring-red-400/20 focus:border-red-400"
                        : "border-gray-200 focus:ring-[#ffac2e]/20 focus:border-[#ffac2e]"
                    }
                `}
            />

            {error && (
                <p className="mt-1.5 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
