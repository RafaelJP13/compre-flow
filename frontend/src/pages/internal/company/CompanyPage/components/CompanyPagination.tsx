import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    shownCount: number;
    totalCount: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function CompanyPagination({
    shownCount,
    totalCount,
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    return (
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <p className="text-sm text-gray-500">
                Mostrando{" "}
                <span className="font-medium">{shownCount}</span>{" "}
                de{" "}
                <span className="font-medium">{totalCount}</span>
            </p>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 border rounded-lg flex items-center justify-center disabled:opacity-40"
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="text-sm">
                    {currentPage} / {totalPages || 1}
                </div>

                <button
                    onClick={() =>
                        onPageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 border rounded-lg flex items-center justify-center disabled:opacity-40"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
