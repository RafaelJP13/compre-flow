import { Eye, Edit } from "lucide-react";
import { CompanyStatusBadge } from "./CompanyStatusBadge";
import type { Company } from "../types";

type Props = {
    company: Company;
    onView: (id: string) => void;
    onEdit: (id: string) => void;
};

export function CompanyTableRow({ company: c, onView, onEdit }: Props) {
    return (
        <tr className="border-b hover:bg-[#ffac2e]/5">
            <td className="px-6 py-4 font-medium text-gray-800">
                {c.fantasyName}
                <div className="text-xs text-gray-500">{c.legalName}</div>
            </td>

            <td className="px-6 py-4 text-sm text-gray-700">
                {c.adminName}
                <div className="text-xs text-gray-500">{c.adminEmail}</div>
            </td>

            <td className="px-6 py-4 text-sm">{c.cnpj}</td>

            <td className="px-6 py-4">
                <CompanyStatusBadge status={c.cnpj_status} />
            </td>

            <td className="px-6 py-4 text-sm text-gray-700">
                {c.city} - {c.state}
            </td>

            <td className="px-6 py-4 text-sm text-gray-700">{c.phone}</td>

            <td className="px-6 py-4 text-sm text-gray-500">{c.address}</td>

            <td className="px-6 py-4">
                <button
                    className="flex items-center gap-2 text-[#ffac2e] hover:bg-[#ffac2e]/10 px-3 py-1.5 rounded-lg cursor-pointer"
                    onClick={() => onView(c.id)}
                >
                    <Eye size={16} />
                    Ver
                </button>
                <button
                    className="flex items-center gap-2 text-[#ffac2e] hover:bg-[#ffac2e]/10 px-3 py-1.5 rounded-lg cursor-pointer"
                    onClick={() => onEdit(c.id)}
                >
                    <Edit size={16} />
                    Editar
                </button>
            </td>
        </tr>
    );
}
