import { BadgeCheck, Calendar } from "lucide-react";
import type { Company } from "../types";

type Props = {
    company: Company;
};

export function StatusCard({ company }: Props) {
    return (
        <div className="bg-white border border-[#FFAC2E] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <BadgeCheck className="text-zinc-700" />

                <h2 className="text-lg font-semibold text-zinc-900">
                    Status
                </h2>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-sm text-zinc-500 mb-1">
                        Situação do CNPJ
                    </p>

                    <span className="inline-flex px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700 font-medium">
                        {company.cnpj_status}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-zinc-500 mb-1">
                        Data de criação
                    </p>

                    <div className="flex items-center gap-2 text-zinc-800">
                        <Calendar size={16} />

                        {new Date(company.createdAt).toLocaleDateString(
                            "pt-BR"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
