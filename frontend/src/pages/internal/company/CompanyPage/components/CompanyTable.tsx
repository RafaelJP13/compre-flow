import { CompanyTableRow } from "./CompanyTableRow";
import type { Company } from "../types";

type Props = {
    companies: Company[];
    onView: (id: string) => void;
    onEdit: (id: string) => void;
};

export function CompanyTable({ companies, onView, onEdit }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
                <thead className="bg-[#ffac2e]/10 border-b">
                    <tr className="text-left text-sm text-gray-600">
                        <th className="px-6 py-4">Empresa</th>
                        <th className="px-6 py-4">Admin</th>
                        <th className="px-6 py-4">CNPJ</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Localização</th>
                        <th className="px-6 py-4">Contato</th>
                        <th className="px-6 py-4">Endereço</th>
                        <th className="px-6 py-4">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {companies.map((c) => (
                        <CompanyTableRow
                            key={c.id}
                            company={c}
                            onView={onView}
                            onEdit={onEdit}
                        />
                    ))}

                    {companies.length === 0 && (
                        <tr>
                            <td
                                colSpan={8}
                                className="text-center py-10 text-gray-500"
                            >
                                Nenhuma empresa encontrada
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
