import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import fetchWithRefresh, { API_BASE_URL } from "../../../../../services/api";
import type { Company } from "../types";

export function useCompanyDetails(id: string | undefined) {
    const navigate = useNavigate();

    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadCompany() {
        try {
            setLoading(true);

            const response = await fetchWithRefresh(
                `${API_BASE_URL}/companies/${id}`
            );

            if (!response.ok) {
                throw new Error("Erro ao carregar empresa");
            }

            const data = await response.json();

            setCompany(data);
        } catch (error) {
            toast.error("Erro ao carregar empresa");

            navigate("/companies");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCompany();
    }, []);

    return { company, loading };
}
