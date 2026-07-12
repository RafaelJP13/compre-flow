import type { CompanyBaseFormData, CreateCompanyFormData } from "./types";

const FIELD_LABELS: Record<
    keyof CompanyBaseFormData | "passwordAdmin",
    string
> = {
    adminName: "Nome do administrador",
    adminEmail: "E-mail do administrador",
    passwordAdmin: "Senha",
    representante: "Representante",
    fantasyName: "Nome fantasia",
    legalName: "Razão social",
    cnpj: "CNPJ",
    cnpj_status: "Situação cadastral",
    phone: "Telefone",
    cep: "CEP",
    state: "Estado",
    city: "Cidade",
    address: "Endereço",
};


const REQUIRED_FIELDS_CREATE: (keyof CreateCompanyFormData)[] = [
    "adminName",
    "adminEmail",
    "passwordAdmin",
    "fantasyName",
    "legalName",
    "cnpj",
    "cnpj_status",
    "phone",
    "cep",
    "state",
    "city",
    "address",
];

const REQUIRED_FIELDS_UPDATE: (keyof CompanyBaseFormData)[] = [
    "adminName",
    "adminEmail",
    "fantasyName",
    "legalName",
    "cnpj",
    "cnpj_status",
    "phone",
    "cep",
    "state",
    "city",
    "address",
];

function buildErrors<T extends Record<string, unknown>>(
    data: T,
    requiredFields: (keyof T)[]
): Partial<Record<keyof T, string>> {
    const errors: Partial<Record<keyof T, string>> = {};

    requiredFields.forEach((field) => {
        const value = data[field];
        const isEmpty = typeof value === "string" ? value.trim() === "" : !value;

        if (isEmpty) {
            const label =
                FIELD_LABELS[field as keyof typeof FIELD_LABELS] ?? String(field);
            errors[field] = `${label} é obrigatório`;
        }
    });

    return errors;
}

export function getCreateCompanyFormErrors(data: CreateCompanyFormData) {
    return buildErrors(data, REQUIRED_FIELDS_CREATE);
}

export function getUpdateCompanyFormErrors(data: CompanyBaseFormData) {
    return buildErrors(data, REQUIRED_FIELDS_UPDATE);
}
