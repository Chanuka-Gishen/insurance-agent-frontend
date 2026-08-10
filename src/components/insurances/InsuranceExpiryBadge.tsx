import { getInsuranceExpiryStatus } from "../../utils/insurance";

interface InsuranceExpiryBadgeProps {
  expiryDate?: string;
}

const InsuranceExpiryBadge = ({ expiryDate }: InsuranceExpiryBadgeProps) => {
  const expiry = getInsuranceExpiryStatus(expiryDate);

  const className =
    expiry.status === "expired"
      ? "bg-red-50 text-red-700"
      : expiry.status === "urgent"
        ? "bg-red-50 text-red-700"
        : expiry.status === "expiring"
          ? "bg-amber-50 text-amber-700"
          : expiry.status === "normal"
            ? "bg-blue-50 text-blue-700"
            : "bg-slate-100 text-slate-500";

  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        className,
      ].join(" ")}
    >
      {expiry.label}
    </span>
  );
};

export default InsuranceExpiryBadge;
