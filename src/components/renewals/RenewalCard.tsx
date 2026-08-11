import { CalendarDays, ChevronRight, ShieldCheck } from "lucide-react";

import { Link } from "react-router-dom";

import type { PopulatedCustomerInsurance } from "../../types/insurance.types";

import { formatDate } from "../../utils/dates";

import { formatInsuranceLabel } from "../../utils/insurance";

import InsuranceExpiryBadge from "../insurances/InsuranceExpiryBadge";

interface Props {
  insurance: PopulatedCustomerInsurance;
}

const RenewalCard = ({ insurance }: Props) => {
  const customer = insurance.customerId;

  return (
    <Link
      to={`/customers/${customer._id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition active:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
            {formatInsuranceLabel(insurance.insuranceType)}
          </p>

          <h2 className="mt-1 truncate text-base font-semibold text-slate-900">
            {customer.fullName}
          </h2>

          <p className="mt-1 text-sm text-slate-500">{customer.phone}</p>
        </div>

        <ChevronRight size={19} className="shrink-0 text-slate-400" />
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-3">
        <div className="flex items-start gap-3">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-blue-600" />

          <div>
            <p className="font-medium text-slate-800">
              {insurance.productName}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {formatInsuranceLabel(insurance.insuranceCompany)}
            </p>

            {insurance.policyNumber && (
              <p className="mt-1 text-xs text-slate-400">
                Policy: {insurance.policyNumber}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />

          {formatDate(insurance.expiryDate)}
        </div>

        <InsuranceExpiryBadge expiryDate={insurance.expiryDate} />
      </div>

      {insurance.insuranceType === "motor" &&
        insurance.motorDetails?.registrationNumber && (
          <p className="mt-3 text-sm text-slate-500">
            Registration:{" "}
            <span className="font-medium text-slate-700">
              {insurance.motorDetails.registrationNumber}
            </span>
          </p>
        )}
    </Link>
  );
};

export default RenewalCard;
