import { Search, Plus } from "lucide-react";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    onAddCompany: () => void;
};

export function CompanyPageHeader({
    search,
    onSearchChange,
    onAddCompany,
}: Props) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Empresas
                </h1>
                <p className="text-sm text-gray-500">
                    Gerenciar todas as empresas da plataforma
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
                <button
                    onClick={onAddCompany}
                    className="
                        px-4 py-2.5
                        bg-black
                        text-white
                        rounded-xl
                        text-sm
                        hover:bg-gray-800
                        transition
                        flex items-center gap-2
                        cursor-pointer
                    "
                >
                    <Plus size={16} />
                    Adicionar Empresa
                </button>

                <div className="relative w-full md:w-80">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar empresas..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="
                            w-full
                            pl-10
                            pr-4
                            py-2.5
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            outline-none
                            focus:ring-2
                            focus:ring-black/10
                        "
                    />
                </div>
            </div>
        </div>
    );
}
