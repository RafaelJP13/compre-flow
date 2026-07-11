import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchWithRefresh, { API_BASE_URL } from "../../../services/api";

export function useDashboardLayout() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    async function handleLogout() {
        await fetchWithRefresh(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
        });

        navigate("/");
    }

    // LOCK SCROLL MOBILE
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return { open, setOpen, handleLogout };
}
