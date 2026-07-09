import { useEffect, useMemo, useState } from "react";
import fetchWithRefresh from "../../../../../services/api";
import { ITEMS_PER_PAGE, type Company } from "../types";

export function useCompanies() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetchWithRefresh(
                    "http://localhost:3000/companies"
                );
                const data = await res.json();
                setCompanies(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const filteredCompanies = useMemo(() => {
        return companies.filter((c) =>
            `${c.fantasyName} ${c.adminName} ${c.cnpj} ${c.city} ${c.state} ${c.cnpj_status}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, companies]);

    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

    const paginatedCompanies = filteredCompanies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return {
        loading,
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        totalPages,
        filteredCompanies,
        paginatedCompanies,
    };
}
