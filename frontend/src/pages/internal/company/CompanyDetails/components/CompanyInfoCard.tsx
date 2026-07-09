import { Building2 } from "lucide-react";
import { InfoItem } from "./InfoItem";
import type { Company } from "../types";

type Props = {
    company: Company;
};

export function CompanyInfoCard({ company }: Props) {
    return (
        <div className="bg-white border border-[#FFAC2E] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
                    <Building2 className="text-zinc-700" />
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-zinc-900">
                        Informações da empresa
                    </h2>

                    <p className="text-sm text-zinc-500">
                        Dados cadastrais da empresa
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoItem label="Nome fantasia" value={company.fantasyName} />
                <InfoItem label="Razão social" value={company.legalName} />
                <InfoItem label="CNPJ" value={company.cnpj} />
                <InfoItem
                    label="Status do CNPJ"
                    value={company.cnpj_status}
                />
                <InfoItem
                    label="Representante"
                    value={company.representante}
                />
                <InfoItem label="Telefone" value={company.phone} />
            </div>
        </div>
    );
}
