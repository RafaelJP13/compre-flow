type Props = {
    label: string;
    value: string;
};

export function InfoItem({ label, value }: Props) {
    return (
        <div>
            <p className="text-sm text-zinc-500 mb-1">{label}</p>

            <p className="text-zinc-900 font-medium break-words">
                {value || "-"}
            </p>
        </div>
    );
}
