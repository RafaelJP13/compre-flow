import { useNavigate } from "react-router-dom";

import { CompanyPageHeader } from "./components/CompanyPageHeader";
import { CompanyTable } from "./components/CompanyTable";
import { CompanyPagination } from "./components/CompanyPagination";

import { useCompanies } from "./hooks/useCompanies";

export default function CompaniesPage() {
    const navigate = useNavigate();

    const {
        loading,
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        totalPages,
        filteredCompanies,
        paginatedCompanies,
    } = useCompanies();

    if (loading) {
        return (
            <div className="p-6 text-gray-500">
                Loading companies...
            </div>
        );
    }

    return (
        <div className="p-6 w-full">
            <CompanyPageHeader
                search={search}
                onSearchChange={setSearch}
                onAddCompany={() => navigate("/companies/create")}
            />

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <CompanyTable
                    companies={paginatedCompanies}
                    onView={(id) => navigate(`/companies/${id}`)}
                    onEdit={(id) => navigate(`/companies/update/${id}`)}
                />

                <CompanyPagination
                    shownCount={paginatedCompanies.length}
                    totalCount={filteredCompanies.length}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
