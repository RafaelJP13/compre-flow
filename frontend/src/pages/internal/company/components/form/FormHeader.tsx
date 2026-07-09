import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
    subtitle: string;
};

export function FormHeader({ title, subtitle }: Props) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    {title}
                </h1>

                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            </div>

            <button
                onClick={() => navigate(-1)}
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
