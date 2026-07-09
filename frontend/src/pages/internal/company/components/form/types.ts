export type CnpjStatus = "idle" | "success" | "error";

export type CompanyBaseFormData = {
    adminName: string;
    adminEmail: string;

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

export type CreateCompanyFormData = CompanyBaseFormData & {
    passwordAdmin: string;
};

export type UpdateCompanyFormData = CompanyBaseFormData;

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

export const emptyUpdateCompanyFormData: UpdateCompanyFormData = {
    adminName: "",
    adminEmail: "",

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
