import { useEffect, useState } from "react";
import fetchWithRefresh, { API_BASE_URL } from "../../../services/api";

export type AuthStatus = "loading" | "auth" | "unauth";

export function useAuthStatus() {
    const [status, setStatus] = useState<AuthStatus>("loading");

    useEffect(() => {
        let active = true;

        fetchWithRefresh(`${API_BASE_URL}/auth/me`, {
            method: "POST",
        })
            .then((res) => {
                if (active) setStatus(res.ok ? "auth" : "unauth");
            })
            .catch(() => {
                if (active) setStatus("unauth");
            });

        return () => {
            active = false;
        };
    }, []);

    return status;
}
