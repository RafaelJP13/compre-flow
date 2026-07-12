import { Building2, Mail, Phone, Search } from "lucide-react";

import { TextField } from "../fields/TextField";
import { IconTextField } from "../fields/IconTextField";
import { DisabledField } from "../fields/DisabledField";
import { MaskedIconField } from "../fields/MaskedIconField";
import { CnpjStatusIndicator } from "../fields/CnpjStatusIndicator";
import { SectionHeading } from "./SectionHeading";

import type { CnpjStatus, CompanyBaseFormData } from "../types";

type CompanyInfoErrors = Partial<
    Record<keyof CompanyBaseFormData | "passwordAdmin", string>
>;

type Props = {
    formData: CompanyBaseFormData & { passwordAdmin?: string };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDocumentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loadingCNPJ: boolean;
    cnpjStatus: CnpjStatus;
    /** Only relevant when creating a new company (a new admin login is created together with it). */
    showPasswordField?: boolean;
    /** The admin e-mail can't be changed once the company already exists. */
    disableEmailField?: boolean;
    errors?: CompanyInfoErrors;
};

export function CompanyInfoSection({
    formData,
    onChange,
    onDocumentChange,
    loadingCNPJ,
    cnpjStatus,
    showPasswordField = false,
    disableEmailField = false,
    errors = {},
}: Props) {
    return (
        <div>
            <SectionHeading
                icon={Building2}
                title="Informações da Empresa"
                subtitle="Dados principais da empresa"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField
                    label="Nome do Administrador"
                    name="adminName"
                    value={formData.adminName}
                    onChange={onChange}
                    placeholder="Digite o nome"
                    error={errors.adminName}
                />

                <IconTextField
                    label="E-mail do Administrador"
                    name="adminEmail"
                    type="email"
                    value={formData.adminEmail}
                    onChange={onChange}
                    placeholder="admin@empresa.com"
                    icon={Mail}
                    disabled={disableEmailField}
                    error={errors.adminEmail}
                />

                {showPasswordField && (
                    <IconTextField
                        label="Senha"
                        name="passwordAdmin"
                        type="password"
                        value={formData.passwordAdmin ?? ""}
                        onChange={onChange}
                        placeholder="••••••••"
                        icon={Mail}
                        error={errors.passwordAdmin}
                    />
                )}

                <MaskedIconField
                    label="CNPJ"
                    name="cnpj"
                    mask="__.___.___/____-__"
                    value={formData.cnpj}
                    onChange={onDocumentChange}
                    placeholder="00.000.000/0000-00"
                    icon={Search}
                    rightSlot={
                        <CnpjStatusIndicator
                            loading={loadingCNPJ}
                            status={cnpjStatus}
                        />
                    }
                    error={errors.cnpj}
                />

                <DisabledField
                    label="Situação Cadastral"
                    name="cnpj_status"
                    value={formData.cnpj_status}
                    placeholder="ATIVA"
                    error={errors.cnpj_status}
                />

                <DisabledField
                    label="Nome Fantasia"
                    name="fantasyName"
                    value={formData.fantasyName}
                    placeholder="Preenchido automaticamente"
                    error={errors.fantasyName}
                />

                <DisabledField
                    label="Razão Social"
                    name="legalName"
                    value={formData.legalName}
                    placeholder="Preenchido automaticamente"
                    error={errors.legalName}
                />

                <MaskedIconField
                    label="Telefone"
                    name="phone"
                    mask="(__) _____-____"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="(11) 99999-9999"
                    icon={Phone}
                    error={errors.phone}
                />
            </div>
        </div>
    );
}
