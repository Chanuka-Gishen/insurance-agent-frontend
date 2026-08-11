import { ChevronRight, ShieldCheck } from "lucide-react";

import { Link } from "react-router-dom";

import type { PopulatedCustomerInsurance } from "../../types/insurance.types";

import { formatDate } from "../../utils/dates";

import { formatInsuranceLabel } from "../../utils/insurance";

import InsuranceExpiryBadge from "../insurances/InsuranceExpiryBadge";

interface Props {
  insurance: PopulatedCustomerInsurance;
}

const DashboardRenewalCard = ({ insurance }: Props) => {
  const customer = insurance.customerId;

  return (
    <Link
      to={`/customers/${customer._id}`}
      className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={18} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {insurance.productName}
            </h3>

            <p className="mt-1 truncate text-sm text-slate-500">
              {customer.fullName}
            </p>
          </div>
        </div>

        <ChevronRight size={18} className="shrink-0 text-slate-400" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <InsuranceExpiryBadge expiryDate={insurance.expiryDate} />

        <span className="text-xs text-slate-400">
          {formatDate(insurance.expiryDate)}
        </span>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {formatInsuranceLabel(insurance.insuranceCompany)}

        {insurance.policyNumber ? ` • ${insurance.policyNumber}` : ""}
      </p>

      {insurance.insuranceType === "motor" &&
        insurance.motorDetails?.registrationNumber && (
          <p className="mt-1 text-xs font-medium text-slate-600">
            {insurance.motorDetails.registrationNumber}
          </p>
        )}
    </Link>
  );
};

export default DashboardRenewalCard;
