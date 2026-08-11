import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;

  onPageChange: (page: number) => void;
}

const RenewalPagination = ({ page, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={17} />
        Previous
      </button>

      <p className="text-sm text-slate-500">
        Page <span className="font-semibold text-slate-800">{page}</span>
        {" of "}
        <span className="font-semibold text-slate-800">{totalPages}</span>
      </p>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={17} />
      </button>
    </div>
  );
};

export default RenewalPagination;
