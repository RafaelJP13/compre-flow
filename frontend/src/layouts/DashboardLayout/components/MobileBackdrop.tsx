type Props = {
    onClick: () => void;
};

export function MobileBackdrop({ onClick }: Props) {
    return (
        <div
            className="
                fixed inset-0
                bg-black/40
                md:hidden
                z-40
            "
            onClick={onClick}
        />
    );
}
