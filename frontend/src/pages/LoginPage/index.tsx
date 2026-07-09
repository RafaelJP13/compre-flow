import { Mail, Lock } from "lucide-react";

import { LoginHeader } from "./components/LoginHeader";
import { LoginIconField } from "./components/LoginIconField";

import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        handleLogin,
    } = useLogin();

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <LoginHeader />

                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <LoginIconField
                        label="E-mail"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={Mail}
                    />

                    <LoginIconField
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={Lock}
                    />

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Carregando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
