export type CreateCompanyFormData = {
    adminName: string;
    adminEmail: string;
    passwordAdmin: string;

    representante: string;

    fantasyName: string;
    legalName: string;

    cnpj: string;
    cnpj_status: string;

    phone: string;

    cep: string;
    state: string;
    city: string;

    address: string;
};

export type CnpjStatus = "idle" | "success" | "error";

export type BrasilApiResponse = {
    razao_social: string;
    nome_fantasia: string;
    email: string;
    ddd_telefone_1: string;
    logradouro: string;
    numero: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
    descricao_situacao_cadastral: string;
};

export const emptyCreateCompanyFormData: CreateCompanyFormData = {
    adminName: "",
    adminEmail: "",
    passwordAdmin: "",

    representante: "",

    fantasyName: "",
    legalName: "",

    cnpj: "",
    cnpj_status: "",

    phone: "",

    cep: "",
    state: "",
    city: "",

    address: "",
};
