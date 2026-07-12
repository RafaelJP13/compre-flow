type Props = {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    className?: string;
    error?: string;
};

export function DisabledField({
    label,
    name,
    value,
    placeholder,
    className,
    error,
}: Props) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <input
                type="text"
                name={name}
                value={value}
                disabled
                placeholder={placeholder}
                className={`
                    w-full
                    px-4 py-3
                    rounded-2xl
                    border
                    bg-gray-100
                    text-gray-500
                    cursor-not-allowed
                    outline-none
                    ${error ? "border-red-300" : "border-gray-200"}
                `}
            />

            {error && (
                <p className="mt-1.5 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
