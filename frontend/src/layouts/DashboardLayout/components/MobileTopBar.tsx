import { Menu } from "lucide-react";

type Props = {
    onOpenMenu: () => void;
};

export function MobileTopBar({ onOpenMenu }: Props) {
    return (
        <div
            className="
                md:hidden
                fixed
                top-0
                left-0
                right-0
                h-16
                bg-white
                border-b
                flex
                items-center
                justify-between
                px-4
                z-50
            "
        >
            <h1 className="font-bold">CompreFlow</h1>

            <button onClick={onOpenMenu} className="cursor-pointer">
                <Menu />
            </button>
        </div>
    );
}
