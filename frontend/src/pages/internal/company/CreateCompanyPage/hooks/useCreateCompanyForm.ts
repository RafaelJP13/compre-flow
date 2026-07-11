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

export function useCreateCompanyForm() {
    const [loading, setLoading] = useState(false);
    const [loadingCNPJ, setLoadingCNPJ] = useState(false);

    const [cnpjStatus, setCnpjStatus] = useState<CnpjStatus>("idle");

    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateCompanyFormData>(
        emptyCreateCompanyFormData
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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

                adminEmail: data.email || "",
                passwordAdmin: "",
                phone: data.ddd_telefone_1 || "",

                address: `${data.logradouro || ""}, ${
                    data.numero || ""
                } - ${data.bairro || ""}`,

                city: data.municipio || "",

                state: data.uf || "",
            }));

            setCnpjStatus("success");
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

        setFormData({
            ...formData,
            cnpj: value,
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
        handleChange,
        handleDocumentChange,
        handleSubmit,
    };
}
