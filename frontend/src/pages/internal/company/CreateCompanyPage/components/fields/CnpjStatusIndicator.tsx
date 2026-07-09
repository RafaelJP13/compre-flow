import { CheckCircle2, AlertCircle } from "lucide-react";
import type { CnpjStatus } from "../../types";

type Props = {
    loading: boolean;
    status: CnpjStatus;
};

export function CnpjStatusIndicator({ loading, status }: Props) {
    return (
        <>
            {loading && (
                <div
                    className="
                        w-5 h-5
                        border-2
                        border-[#ffac2e]
                        border-t-transparent
                        rounded-full
                        animate-spin
                    "
                />
            )}

            {status === "success" && (
                <CheckCircle2 size={20} className="text-green-500" />
            )}

            {status === "error" && (
                <AlertCircle size={20} className="text-red-500" />
            )}
        </>
    );
}
