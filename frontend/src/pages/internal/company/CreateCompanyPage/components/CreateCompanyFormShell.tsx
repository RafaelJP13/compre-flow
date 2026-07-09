import type { ReactNode } from "react";

type Props = {
    onSubmit: (e: React.FormEvent) => void;
    children: ReactNode;
};

export function CreateCompanyFormShell({ onSubmit, children }: Props) {
    return (
        <form
            onSubmit={onSubmit}
            className="
                bg-white
                border border-gray-100
                rounded-3xl
                shadow-sm
                overflow-hidden
            "
        >
            <div
                className="
                    h-2
                    bg-gradient-to-r
                    from-[#ffac2e]
                    to-orange-400
                "
            />

            <div className="p-8">{children}</div>
        </form>
    );
}
