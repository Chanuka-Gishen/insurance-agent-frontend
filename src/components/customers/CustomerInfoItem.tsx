import type { ReactNode } from "react";

interface CustomerInfoItemProps {
  label: string;
  value?: ReactNode;
}

const CustomerInfoItem = ({ label, value }: CustomerInfoItemProps) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-1 text-sm font-medium text-slate-800">
        {value || "—"}
      </div>
    </div>
  );
};

export default CustomerInfoItem;
