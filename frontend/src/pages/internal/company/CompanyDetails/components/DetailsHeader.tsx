import { ArrowLeft } from "lucide-react";

type Props = {
    title: string;
    onBack: () => void;
};

export function DetailsHeader({ title, onBack }: Props) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900">
                    {title}
                </h1>

                <p className="text-zinc-500 mt-1">
                    Visualização completa da empresa
                </p>
            </div>

            <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#FFAC2E] hover:bg-zinc-100 transition cursor-pointer"
            >
                <ArrowLeft size={18} />
                Voltar
            </button>
        </div>
    );
}
