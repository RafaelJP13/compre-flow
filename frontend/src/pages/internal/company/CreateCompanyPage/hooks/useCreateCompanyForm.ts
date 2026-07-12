import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import fetchWithRefresh, { API_BASE_URL } from "../../../../../services/api";
import {
    emptyCreateCompanyFormData,
    type BrasilApiResponse,
    type CnpjStatus,
    type CreateCompanyFormData,
} from "../../components/form/types";
import { getCreateCompanyFormErrors } from "../../components/form/validation";

type FormErrors = Partial<Record<keyof CreateCompanyFormData, string>>;

export function useCreateCompanyForm() {
    const [loading, setLoading] = useState(false);
    const [loadingCNPJ, setLoadingCNPJ] = useState(false);

    const [cnpjStatus, setCnpjStatus] = useState<CnpjStatus>("idle");
    const [errors, setErrors] = useState<FormErrors>({});

    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateCompanyFormData>(
        emptyCreateCompanyFormData
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => {
            if (!prev[name as keyof CreateCompanyFormData]) return prev;
            const next = { ...prev };
            delete next[name as keyof CreateCompanyFormData];
            return next;
        });
    };

    const fetchCNPJ = async (cnpj: string) => {
        try {
            setLoadingCNPJ(true);
            setCnpjStatus("idle");

            const cleanedCNPJ = cnpj.replace(/\D/g, "");

            const response = await fetch(
                `https://brasilapi.com.br/api/cnpj/v1/${cleanedCNPJ}`
            );

            if (!response.ok) {
                throw new Error("Erro ao consultar CNPJ");
            }

            const data: BrasilApiResponse = await response.json();

            setFormData((prev) => ({
                ...prev,

                fantasyName:
                    data.nome_fantasia || data.razao_social || "",

                legalName: data.razao_social || "",

                cnpj_status: data.descricao_situacao_cadastral || "",

                cep: data.cep || "",
                passwordAdmin: "",
                phone: data.ddd_telefone_1 || "",

                address: `${data.logradouro || ""}, ${data.numero || ""
                    } - ${data.bairro || ""}`,

                city: data.municipio || "",

                state: data.uf || "",
            }));

            setCnpjStatus("success");

            setErrors((prev) => {
                const next = { ...prev };
                (
                    [
                        "fantasyName",
                        "legalName",
                        "cnpj_status",
                        "cep",
                        "phone",
                        "address",
                        "city",
                        "state",
                    ] as (keyof CreateCompanyFormData)[]
                ).forEach((field) => delete next[field]);
                return next;
            });
        } catch (error) {
            console.error(error);

            setCnpjStatus("error");
        } finally {
            setLoadingCNPJ(false);
        }
    };

    const handleDocumentChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            cnpj: value,
        }));

        setErrors((prev) => {
            if (!prev.cnpj) return prev;
            const next = { ...prev };
            delete next.cnpj;
            return next;
        });

        const cleaned = value.replace(/\D/g, "");

        if (cleaned.length === 14) {
            await fetchCNPJ(cleaned);
        } else {
            setCnpjStatus("idle");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formErrors = getCreateCompanyFormErrors(formData);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetchWithRefresh(
                `${API_BASE_URL}/companies`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create company");
            }

            await response.json();

            toast.success("Empresa criada com sucesso!");

            setTimeout(() => {
                navigate("/companies");
            }, 1200);

            setFormData(emptyCreateCompanyFormData);

            setCnpjStatus("idle");
            setErrors({});
        } catch (error) {
            console.error(error);

            toast.error("Erro ao criar empresa!");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        loadingCNPJ,
        cnpjStatus,
        formData,
        errors,
        handleChange,
        handleDocumentChange,
        handleSubmit,
    };
}
