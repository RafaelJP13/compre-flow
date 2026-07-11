import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStatus } from "./hooks/useAuthStatus";
import { AuthLoading } from "./AuthLoading";

export default function ProtectedRoute({ children }: PropsWithChildren) {
    const status = useAuthStatus();

    if (status === "loading") return <AuthLoading />;

    if (status === "unauth") return <Navigate to="/" replace />;

    return children;
}
