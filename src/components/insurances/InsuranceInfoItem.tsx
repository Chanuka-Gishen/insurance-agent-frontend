import type { ReactNode } from "react";

interface InsuranceInfoItemProps {
  label: string;
  value?: ReactNode;
}

const InsuranceInfoItem = ({ label, value }: InsuranceInfoItemProps) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-1.5 text-sm font-medium text-slate-800">
        {value === undefined || value === null || value === "" ? "—" : value}
      </div>
    </div>
  );
};

export default InsuranceInfoItem;
