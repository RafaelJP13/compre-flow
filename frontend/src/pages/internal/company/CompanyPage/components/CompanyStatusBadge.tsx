type Props = {
    status: string;
};

export function CompanyStatusBadge({ status }: Props) {
    return (
        <span
            className={`
                px-2 py-1 rounded-lg text-xs font-medium
                ${
                    status === "VALID"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }
            `}
        >
            {status}
        </span>
    );
}
