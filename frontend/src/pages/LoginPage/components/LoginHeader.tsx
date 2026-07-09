import { ShoppingBag } from "lucide-react";

export function LoginHeader() {
    return (
        <div className="flex flex-col items-center mb-8">
            <div className="bg-white text-black p-3 rounded-2xl mb-4">
                <ShoppingBag size={32} />
            </div>

            <h1 className="text-3xl font-bold text-white">Bem vindo!</h1>

            <p className="text-zinc-400 mt-2 text-center">
                Faça login para continuar
            </p>
        </div>
    );
}
