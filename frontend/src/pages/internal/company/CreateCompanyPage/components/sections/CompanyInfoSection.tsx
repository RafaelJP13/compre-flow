import { Building2, Mail, Phone, Search } from "lucide-react";

import { TextField } from "../fields/TextField";
import { IconTextField } from "../fields/IconTextField";
import { DisabledField } from "../fields/DisabledField";
import { MaskedIconField } from "../fields/MaskedIconField";
import { CnpjStatusIndicator } from "../fields/CnpjStatusIndicator";
import { SectionHeading } from "./SectionHeading";

import type { CnpjStatus, CreateCompanyFormData } from "../../types";

type Props = {
    formData: CreateCompanyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDocumentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loadingCNPJ: boolean;
    cnpjStatus: CnpjStatus;
};

export function CompanyInfoSection({
    formData,
    onChange,
    onDocumentChange,
    loadingCNPJ,
    cnpjStatus,
}: Props) {
    return (
        <div className="mb-10">
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
                />

                <IconTextField
                    label="E-mail do Administrador"
                    name="adminEmail"
                    type="email"
                    value={formData.adminEmail}
                    onChange={onChange}
                    placeholder="admin@empresa.com"
                    icon={Mail}
                />

                <IconTextField
                    label="Senha"
                    name="passwordAdmin"
                    type="password"
                    value={formData.passwordAdmin}
                    onChange={onChange}
                    placeholder="••••••••"
                    icon={Mail}
                />

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
                />

                <DisabledField
                    label="Situação Cadastral"
                    name="cnpj_status"
                    value={formData.cnpj_status}
                    placeholder="ATIVA"
                />

                <DisabledField
                    label="Nome Fantasia"
                    name="fantasyName"
                    value={formData.fantasyName}
                    placeholder="Preenchido automaticamente"
                />

                <DisabledField
                    label="Razão Social"
                    name="legalName"
                    value={formData.legalName}
                    placeholder="Preenchido automaticamente"
                />

                <MaskedIconField
                    label="Telefone"
                    name="phone"
                    mask="(__) _____-____"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="(11) 99999-9999"
                    icon={Phone}
                />
            </div>
        </div>
    );
}
