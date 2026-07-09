import { FormHeader } from "../components/form/FormHeader";
import { FormShell } from "../components/form/FormShell";
import { CompanyInfoSection } from "../components/form/sections/CompanyInfoSection";
import { AddressSection } from "../components/form/sections/AddressSection";
import { ActionsSection } from "../components/form/sections/ActionsSection";

import { useCreateCompanyForm } from "./hooks/useCreateCompanyForm";

export default function CreateCompanyPage() {
    const {
        loading,
        loadingCNPJ,
        cnpjStatus,
        formData,
        handleChange,
        handleDocumentChange,
        handleSubmit,
    } = useCreateCompanyForm();

    return (
        <div className="p-6 w-full bg-gray-50 min-h-screen">
            <FormHeader
                title="Adicionar Empresa"
                subtitle="Cadastre uma nova empresa na plataforma"
            />

            <FormShell onSubmit={handleSubmit}>
                <CompanyInfoSection
                    formData={formData}
                    onChange={handleChange}
                    onDocumentChange={handleDocumentChange}
                    loadingCNPJ={loadingCNPJ}
                    cnpjStatus={cnpjStatus}
                    showPasswordField
                />

                <AddressSection
                    formData={formData}
                    onChange={handleChange}
                />

                <ActionsSection
                    loading={loading}
                    submitText="Salvar Empresa"
                    loadingText="Salvando..."
                />
            </FormShell>
        </div>
    );
}
