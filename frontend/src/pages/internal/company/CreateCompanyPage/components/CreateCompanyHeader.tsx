import { ArrowLeft } from "lucide-react";

export function CreateCompanyHeader() {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Adicionar Empresa
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Cadastre uma nova empresa na plataforma
                </p>
            </div>

            <button
                onClick={() => window.history.back()}
                className="
                    flex items-center gap-2
                    px-4 py-2
                    bg-white
                    border border-gray-200
                    rounded-2xl
                    hover:bg-gray-100
                    transition
                    shadow-sm
                    cursor-pointer
                "
            >
                <ArrowLeft size={16} />
                Voltar
            </button>
        </div>
    );
}
