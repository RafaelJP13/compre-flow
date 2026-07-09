import { InputMask } from "@react-input/mask";

type Props = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    mask: string;
};

export function MaskedField({
    label,
    name,
    value,
    onChange,
    placeholder,
    mask,
}: Props) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <InputMask
                mask={mask}
                replacement={{ _: /\d/ }}
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    px-4 py-3
                    rounded-2xl
                    border border-gray-200
                    outline-none
                    focus:ring-4
                    focus:ring-[#ffac2e]/20
                    focus:border-[#ffac2e]
                "
            />
        </div>
    );
}
