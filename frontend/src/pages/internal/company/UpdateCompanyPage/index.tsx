import { useParams } from "react-router-dom";

import { FormHeader } from "../components/form/FormHeader";
import { FormShell } from "../components/form/FormShell";
import { CompanyInfoSection } from "../components/form/sections/CompanyInfoSection";
import { AddressSection } from "../components/form/sections/AddressSection";
import { ActionsSection } from "../components/form/sections/ActionsSection";

import { useUpdateCompanyForm } from "./hooks/useUpdateCompanyForm";

export default function UpdateCompanyPage() {
    const { id } = useParams();

    const {
        loading,
        loadingPage,
        loadingCNPJ,
        cnpjStatus,
        formData,
        errors,
        handleChange,
        handleDocumentChange,
        handleSubmit,
    } = useUpdateCompanyForm(id);

    if (loadingPage) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-10 h-10 border-4 border-[#ffac2e] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 w-full bg-gray-50 min-h-screen">
            <FormHeader
                title="Atualizar Empresa"
                subtitle="Atualize os dados da empresa"
            />

            <FormShell onSubmit={handleSubmit}>
                <CompanyInfoSection
                    formData={formData}
                    onChange={handleChange}
                    onDocumentChange={handleDocumentChange}
                    loadingCNPJ={loadingCNPJ}
                    cnpjStatus={cnpjStatus}
                    disableEmailField
                    errors={errors}
                />

                <AddressSection
                    formData={formData}
                    onChange={handleChange}
                    errors={errors}
                />

                <ActionsSection
                    loading={loading}
                    submitText="Atualizar Empresa"
                    loadingText="Atualizando..."
                />
            </FormShell>
        </div>
    );
}
