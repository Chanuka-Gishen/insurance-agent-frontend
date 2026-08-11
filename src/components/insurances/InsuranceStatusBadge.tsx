interface InsuranceStatusBadgeProps {
  status: string;
}

const InsuranceStatusBadge = ({ status }: InsuranceStatusBadgeProps) => {
  const normalized = status.toLowerCase();

  const className =
    normalized === "active"
      ? "bg-emerald-50 text-emerald-700"
      : normalized === "expired"
        ? "bg-red-50 text-red-700"
        : normalized === "cancelled"
          ? "bg-slate-100 text-slate-600"
          : "bg-blue-50 text-blue-700";

  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        className,
      ].join(" ")}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
};

export default InsuranceStatusBadge;
