import type { LucideIcon } from "lucide-react";

type Props = {
    icon: LucideIcon;
    title: string;
    subtitle: string;
};

export function SectionHeading({ icon: Icon, title, subtitle }: Props) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div
                className="
                    w-10 h-10
                    rounded-2xl
                    bg-[#ffac2e]/10
                    flex items-center justify-center
                "
            >
                <Icon size={20} className="text-[#ffac2e]" />
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-800">
                    {title}
                </h2>

                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
    );
}
