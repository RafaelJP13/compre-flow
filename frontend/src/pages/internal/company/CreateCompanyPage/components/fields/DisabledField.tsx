type Props = {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
};

export function DisabledField({ label, name, value, placeholder }: Props) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <input
                type="text"
                name={name}
                value={value}
                disabled
                placeholder={placeholder}
                className="
                    w-full
                    px-4 py-3
                    rounded-2xl
                    border border-gray-200
                    bg-gray-100
                    text-gray-500
                    cursor-not-allowed
                    outline-none
                "
            />
        </div>
    );
}
