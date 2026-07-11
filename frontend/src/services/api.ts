export const API_BASE_URL = "http://localhost:3000";

async function fetchWithRefresh(input: RequestInfo, init?: RequestInit): Promise<Response> {
    let res = await fetch(input, {
        ...init,
        credentials: "include",
    });

    if (res.status === 401) {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (!refreshRes.ok) {
            return res;
        }

        res = await fetch(input, {
            ...init,
            credentials: "include",
        });
    }

    return res;
}

export default fetchWithRefresh;