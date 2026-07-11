import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import fetchWithRefresh, { API_BASE_URL } from "../../../../../services/api";
import {
    emptyUpdateCompanyFormData,
    type BrasilApiResponse,
    type CnpjStatus,
    type UpdateCompanyFormData,
} from "../../components/form/types";

export function useUpdateCompanyForm(id: string | undefined) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingCNPJ, setLoadingCNPJ] = useState(false);

    const [cnpjStatus, setCnpjStatus] = useState<CnpjStatus>("idle");

    const [formData, setFormData] = useState<UpdateCompanyFormData>(
        emptyUpdateCompanyFormData
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
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

                phone: data.ddd_telefone_1 || prev.phone,

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

        setFormData((prev) => ({
            ...prev,
            cnpj: value,
        }));

        const cleaned = value.replace(/\D/g, "");

        if (cleaned.length === 14) {
            await fetchCNPJ(cleaned);
        } else {
            setCnpjStatus("idle");
        }
    };

    const fetchCompany = async () => {
        try {
            setLoadingPage(true);

            const response = await fetchWithRefresh(
                `${API_BASE_URL}/companies/${id}`
            );

            if (!response.ok) {
                throw new Error("Erro ao buscar empresa");
            }

            const data = await response.json();

            setFormData({
                adminName: data.adminName || "",
                adminEmail: data.adminEmail || "",

                representante: data.representante || "",

                fantasyName: data.fantasyName || "",
                legalName: data.legalName || "",

                cnpj: data.cnpj || "",
                cnpj_status: data.cnpj_status || "",

                phone: data.phone || "",

                cep: data.cep || "",
                state: data.state || "",
                city: data.city || "",

                address: data.address || "",
            });

            setCnpjStatus(data.cnpj_status ? "success" : "idle");
        } catch (error) {
            toast.error("Erro ao carregar empresa");

            navigate("/companies");
        } finally {
            setLoadingPage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetchWithRefresh(
                `${API_BASE_URL}/companies/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao atualizar empresa");
            }

            toast.success("Empresa atualizada com sucesso!");

            setTimeout(() => {
                navigate("/companies");
            }, 1200);
        } catch (error) {
            toast.error("Erro ao atualizar empresa");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompany();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return {
        loading,
        loadingPage,
        loadingCNPJ,
        cnpjStatus,
        formData,
        handleChange,
        handleDocumentChange,
        handleSubmit,
    };
}
