import { MapPin } from "lucide-react";
import { InfoItem } from "./InfoItem";
import type { Company } from "../types";

type Props = {
    company: Company;
};

export function AddressCard({ company }: Props) {
    return (
        <div className="bg-white border border-[#FFAC2E] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
                    <MapPin className="text-zinc-700" />
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-zinc-900">
                        Endereço
                    </h2>

                    <p className="text-sm text-zinc-500">
                        Informações de localização
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoItem label="CEP" value={company.cep} />
                <InfoItem label="Estado" value={company.state} />
                <InfoItem label="Cidade" value={company.city} />
                <InfoItem
                    label="Bairro"
                    value={company.neighborhood}
                />

                <div className="md:col-span-2">
                    <InfoItem label="Endereço" value={company.address} />
                </div>
            </div>
        </div>
    );
}
