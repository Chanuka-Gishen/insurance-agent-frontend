import {
  ArrowLeft,
  CalendarDays,
  Edit3,
  FileText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../utils/api.utils";

import InsuranceExpiryBadge from "../components/insurances/InsuranceExpiryBadge";
import InsuranceInfoItem from "../components/insurances/InsuranceInfoItem";
import InsuranceSpecificDetails from "../components/insurances/InsuranceSpecificDetails";
import InsuranceStatusBadge from "../components/insurances/InsuranceStatusBadge";

import { useInsurance } from "../hooks/insurances/useInsurance";

import { formatDate } from "../utils/dates";

import { formatCurrency, formatInsuranceLabel } from "../utils/insurance";

const InsuranceDetailsPage = () => {
  const { customerId, insuranceId } = useParams<{
    customerId: string;
    insuranceId: string;
  }>();

  const {
    data: insurance,
    isLoading,
    isError,
    error,
  } = useInsurance(customerId ?? "", insuranceId ?? "");

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-36 animate-pulse rounded-2xl bg-slate-200" />

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />

          <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError || !insurance || !customerId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="font-semibold text-red-700">Unable to load insurance</h1>

        <p className="mt-2 text-sm text-red-600">
          {getApiErrorMessage(error, "Insurance could not be loaded.")}
        </p>

        <Link
          to={`/customers/${customerId ?? ""}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-700"
        >
          <ArrowLeft size={16} />
          Back to customer
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <div className="mb-5">
        <Link
          to={`/customers/${customerId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Customer Details
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <ShieldCheck size={27} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  {insurance.productName}
                </h1>

                <InsuranceStatusBadge status={insurance.status} />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {formatInsuranceLabel(insurance.insuranceType)}

                {insurance.insuranceCompany
                  ? ` • ${formatInsuranceLabel(insurance.insuranceCompany)}`
                  : ""}
              </p>

              <div className="mt-3">
                <InsuranceExpiryBadge expiryDate={insurance.expiryDate} />
              </div>
            </div>
          </div>

          <Link
            to={`/customers/${customerId}/insurances/${insurance._id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Edit3 size={17} />
            Edit Policy
          </Link>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-600" />

            <h2 className="font-semibold text-slate-900">Policy Information</h2>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <InsuranceInfoItem
              label="Insurance Type"
              value={formatInsuranceLabel(insurance.insuranceType)}
            />

            <InsuranceInfoItem label="Product" value={insurance.productName} />

            <InsuranceInfoItem
              label="Product Code"
              value={insurance.productCode}
            />

            <InsuranceInfoItem
              label="Company"
              value={formatInsuranceLabel(insurance.insuranceCompany)}
            />

            <InsuranceInfoItem
              label="Policy Number"
              value={insurance.policyNumber}
            />

            <InsuranceInfoItem
              label="Proposal Number"
              value={insurance.proposalNumber}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <WalletCards size={18} className="text-blue-600" />

            <h2 className="font-semibold text-slate-900">
              Financial Information
            </h2>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <InsuranceInfoItem
              label="Premium Amount"
              value={formatCurrency(insurance.premiumAmount)}
            />

            <InsuranceInfoItem
              label="Insured Value"
              value={formatCurrency(insurance.insuredValue)}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-blue-600" />

            <h2 className="font-semibold text-slate-900">Policy Period</h2>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <InsuranceInfoItem
              label="Start Date"
              value={formatDate(insurance.startDate)}
            />

            <InsuranceInfoItem
              label="Expiry Date"
              value={formatDate(insurance.expiryDate)}
            />
          </div>

          <div className="mt-5">
            <InsuranceExpiryBadge expiryDate={insurance.expiryDate} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Description</h2>

          <div className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {insurance.description || "No description provided."}
          </div>
        </section>
      </div>

      <div className="mt-5">
        <InsuranceSpecificDetails insurance={insurance} />
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Notes</h2>

        <div className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          {insurance.notes || "No notes added for this policy."}
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Record Information</h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <InsuranceInfoItem
            label="Created"
            value={formatDate(insurance.createdAt)}
          />

          <InsuranceInfoItem
            label="Last Updated"
            value={formatDate(insurance.updatedAt)}
          />
        </div>
      </section>
    </div>
  );
};

export default InsuranceDetailsPage;
