import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { InputMask } from "@react-input/mask";

type Props = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    mask: string;
    icon: LucideIcon;
    rightSlot?: ReactNode;
};

export function MaskedIconField({
    label,
    name,
    value,
    onChange,
    placeholder,
    mask,
    icon: Icon,
    rightSlot,
}: Props) {
    const inputClassName = rightSlot
        ? `
            w-full
            pl-12
            pr-12
            py-3
            rounded-2xl
            border border-gray-200
            bg-white
            outline-none
            transition
            focus:ring-4
            focus:ring-[#ffac2e]/20
            focus:border-[#ffac2e]
        `
        : `
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
        `;

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

                <InputMask
                    mask={mask}
                    replacement={{ _: /\d/ }}
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={inputClassName}
                />

                {rightSlot && (
                    <div
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                        "
                    >
                        {rightSlot}
                    </div>
                )}
            </div>
        </div>
    );
}
