import { ChevronRight } from "lucide-react";

import { Link } from "react-router-dom";

import type { PopulatedCustomerInsurance } from "../../types/insurance.types";

import { formatDate } from "../../utils/dates";

import { formatInsuranceLabel } from "../../utils/insurance";

import InsuranceExpiryBadge from "../insurances/InsuranceExpiryBadge";

interface Props {
  insurances: PopulatedCustomerInsurance[];
}

const RenewalsTable = ({ insurances }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Customer</th>

              <th className="px-5 py-4">Product</th>

              <th className="px-5 py-4">Company</th>

              <th className="px-5 py-4">Policy</th>

              <th className="px-5 py-4">Expiry</th>

              <th className="px-5 py-4">Attention</th>

              <th className="w-12 px-3 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {insurances.map((insurance) => {
              const customer = insurance.customerId;

              return (
                <tr
                  key={insurance._id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <Link
                      to={`/customers/${customer._id}`}
                      className="font-medium text-slate-900 hover:text-blue-600"
                    >
                      {customer.fullName}
                    </Link>

                    <p className="mt-1 text-xs text-slate-400">
                      {customer.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-800">
                      {insurance.productName}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatInsuranceLabel(insurance.insuranceType)}
                    </p>

                    {insurance.insuranceType === "motor" &&
                      insurance.motorDetails?.registrationNumber && (
                        <p className="mt-1 text-xs text-slate-500">
                          {insurance.motorDetails.registrationNumber}
                        </p>
                      )}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatInsuranceLabel(insurance.insuranceCompany)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {insurance.policyNumber ?? "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatDate(insurance.expiryDate)}
                  </td>

                  <td className="px-5 py-4">
                    <InsuranceExpiryBadge expiryDate={insurance.expiryDate} />
                  </td>

                  <td className="px-3 py-4">
                    <Link
                      to={`/customers/${customer._id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RenewalsTable;
