import { ChevronRight } from "lucide-react";

import { Link } from "react-router-dom";

import type { Customer } from "../../types/customer.types";

import { formatDate } from "../../utils/dates";

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Customer</th>

              <th className="px-5 py-4">Phone</th>

              <th className="px-5 py-4">Type</th>

              <th className="px-5 py-4">Next follow-up</th>

              <th className="px-5 py-4">Status</th>

              <th className="w-12 px-3 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {customers.map((customer) => (
              <tr key={customer._id} className="transition hover:bg-slate-50">
                <td className="px-5 py-4">
                  <Link
                    to={`/customers/${customer._id}`}
                    className="font-medium text-slate-900 hover:text-blue-600"
                  >
                    {customer.fullName}
                  </Link>

                  {customer.nic && (
                    <p className="mt-1 text-xs text-slate-400">
                      NIC: {customer.nic}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {customer.phone}
                </td>

                <td className="px-5 py-4 text-sm capitalize text-slate-600">
                  {customer.customerType}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {formatDate(customer.nextFollowUpDate)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={[
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                      customer.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {customer.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-3 py-4">
                  <Link
                    to={`/customers/${customer._id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <ChevronRight size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
