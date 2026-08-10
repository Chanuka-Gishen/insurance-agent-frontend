import { CalendarDays, ChevronRight, ShieldCheck } from "lucide-react";

import { Link } from "react-router-dom";

import type { CustomerInsurance } from "../../types/insurance.types";

import { formatDate } from "../../utils/dates";

import { formatCurrency } from "../../utils/insurance";

import InsuranceExpiryBadge from "./InsuranceExpiryBadge";
import InsuranceStatusBadge from "./InsuranceStatusBadge";

interface InsuranceCardProps {
  insurance: CustomerInsurance;
}

const formatLabel = (value?: string) => {
  if (!value) {
    return "—";
  }

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const InsuranceCard = ({ insurance }: InsuranceCardProps) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900">
              {formatLabel(insurance.insuranceType)}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {formatLabel(insurance.insuranceCompany)}
            </p>
          </div>
        </div>

        <InsuranceStatusBadge status={insurance.status} />
      </div>

      {insurance.policyNumber && (
        <p className="mt-4 text-sm text-slate-500">
          Policy:{" "}
          <span className="font-medium text-slate-700">
            {insurance.policyNumber}
          </span>
        </p>
      )}

      <div className="mt-4">
        <InsuranceExpiryBadge expiryDate={insurance.expiryDate} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Premium
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {formatCurrency(insurance.premiumAmount)}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Insured Value
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {formatCurrency(insurance.insuredValue)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
        <CalendarDays size={16} />

        <span>
          {formatDate(insurance.startDate)}
          {" — "}
          {formatDate(insurance.expiryDate)}
        </span>
      </div>

      <Link
        to={`/customers/${insurance.customerId}/insurances/${insurance._id}`}
        className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        View Policy
        <ChevronRight size={17} />
      </Link>
    </article>
  );
};

export default InsuranceCard;
