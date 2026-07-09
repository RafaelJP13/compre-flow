import { Mail } from "lucide-react";
import { InfoItem } from "./InfoItem";
import type { Company } from "../types";

type Props = {
    company: Company;
};

export function AdminCard({ company }: Props) {
    return (
        <div className="bg-white border border-[#FFAC2E] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <Mail className="text-zinc-700" />

                <h2 className="text-lg font-semibold text-zinc-900">
                    Administrador
                </h2>
            </div>

            <div className="space-y-4">
                <InfoItem label="Nome" value={company.adminName} />
                <InfoItem label="E-mail" value={company.adminEmail} />
            </div>
        </div>
    );
}
