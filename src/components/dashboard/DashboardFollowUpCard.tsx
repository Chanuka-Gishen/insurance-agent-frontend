import { CalendarClock, ChevronRight, Phone } from "lucide-react";

import { Link } from "react-router-dom";

import type { DashboardFollowUpCustomer } from "../../types/dashboard.types";

import { formatDate } from "../../utils/dates";

interface Props {
  customer: DashboardFollowUpCustomer;
  overdue?: boolean;
}

const DashboardFollowUpCard = ({ customer, overdue = false }: Props) => {
  return (
    <Link
      to={`/customers/${customer._id}`}
      className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900">
            {customer.fullName}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <Phone size={14} />

            {customer.phone}
          </p>
        </div>

        <ChevronRight size={18} className="shrink-0 text-slate-400" />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <CalendarClock
          size={15}
          className={overdue ? "text-red-500" : "text-blue-500"}
        />

        <span
          className={[
            "text-sm font-medium",
            overdue ? "text-red-600" : "text-slate-600",
          ].join(" ")}
        >
          {formatDate(customer.nextFollowUpDate)}
        </span>
      </div>

      {customer.followUpNote && (
        <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
          {customer.followUpNote}
        </p>
      )}
    </Link>
  );
};

export default DashboardFollowUpCard;
