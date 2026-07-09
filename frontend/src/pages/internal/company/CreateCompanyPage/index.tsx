import { CreateCompanyHeader } from "./components/CreateCompanyHeader";
import { CreateCompanyFormShell } from "./components/CreateCompanyFormShell";
import { CompanyInfoSection } from "./components/sections/CompanyInfoSection";
import { AddressSection } from "./components/sections/AddressSection";
import { ActionsSection } from "./components/sections/ActionsSection";

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
            <CreateCompanyHeader />

            <CreateCompanyFormShell onSubmit={handleSubmit}>
                <CompanyInfoSection
                    formData={formData}
                    onChange={handleChange}
                    onDocumentChange={handleDocumentChange}
                    loadingCNPJ={loadingCNPJ}
                    cnpjStatus={cnpjStatus}
                />

                <AddressSection
                    formData={formData}
                    onChange={handleChange}
                />

                <ActionsSection loading={loading} />
            </CreateCompanyFormShell>
        </div>
    );
}
