export type Company = {
    id: string;

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

    createdAt: string;
    updatedAt: string;
};

export const ITEMS_PER_PAGE = 8;
