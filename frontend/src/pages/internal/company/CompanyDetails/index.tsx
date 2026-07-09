import { useNavigate, useParams } from "react-router-dom";

import { DetailsHeader } from "./components/DetailsHeader";
import { CompanyInfoCard } from "./components/CompanyInfoCard";
import { AddressCard } from "./components/AddressCard";
import { AdminCard } from "./components/AdminCard";
import { StatusCard } from "./components/StatusCard";

import { useCompanyDetails } from "./hooks/useCompanyDetails";

export default function CompanyDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { company, loading } = useCompanyDetails(id);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-zinc-500">Carregando empresa...</p>
            </div>
        );
    }

    if (!company) {
        return null;
    }

    return (
        <div className="space-y-6">
            <DetailsHeader
                title={company.fantasyName}
                onBack={() => navigate("/companies")}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CompanyInfoCard company={company} />
                    <AddressCard company={company} />
                </div>

                <div className="space-y-6">
                    <AdminCard company={company} />
                    <StatusCard company={company} />
                </div>
            </div>
        </div>
    );
}
