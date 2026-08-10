import { Plus, ShieldCheck } from "lucide-react";

import { Link } from "react-router-dom";

import { useCustomerInsurances } from "../../hooks/insurances/useCustomerInsurances";

import InsuranceCard from "./InsuranceCard";

interface InsuranceListProps {
  customerId: string;
}

const InsuranceList = ({ customerId }: InsuranceListProps) => {
  const {
    data: insurances = [],
    isLoading,
    isError,
  } = useCustomerInsurances(customerId);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={19} className="text-blue-600" />

            <h2 className="font-semibold text-slate-900">Insurance Policies</h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {insurances.length} polic
            {insurances.length === 1 ? "y" : "ies"}
          </p>
        </div>

        <Link
          to={`/customers/${customerId}/insurances/create`}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />

          <span className="hidden sm:inline">Add Insurance</span>
        </Link>
      </div>

      {isLoading && (
        <div className="mt-5 grid gap-3 xl:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          Unable to load insurance policies.
        </div>
      )}

      {!isLoading && !isError && insurances.length === 0 && (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <ShieldCheck size={22} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No insurance policies
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Add this customer's first insurance policy.
          </p>

          <Link
            to={`/customers/${customerId}/insurances/create`}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus size={17} />
            Add Insurance
          </Link>
        </div>
      )}

      {!isLoading && !isError && insurances.length > 0 && (
        <div className="mt-5 grid gap-3 xl:grid-cols-2">
          {insurances.map((insurance) => (
            <InsuranceCard key={insurance._id} insurance={insurance} />
          ))}
        </div>
      )}
    </section>
  );
};

export default InsuranceList;
