import { CalendarClock, MessageCircle, Phone } from "lucide-react";

import { Link } from "react-router-dom";

import type { Customer } from "../../types/customer.types";

import { formatDate } from "../../utils/dates";

import { getTelLink, getWhatsAppLink } from "../../utils/phone";

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard = ({ customer }: CustomerCardProps) => {
  const whatsapp = customer.whatsappNumber || customer.phone;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Link to={`/customers/${customer._id}`} className="block">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {customer.fullName}
            </h3>

            <p className="mt-1 text-sm text-slate-500">{customer.phone}</p>
          </div>

          <span
            className={[
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
              customer.isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-500",
            ].join(" ")}
          >
            {customer.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <CalendarClock size={16} />

          <span>Follow-up: {formatDate(customer.nextFollowUpDate)}</span>
        </div>
      </Link>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
        <a
          href={getTelLink(customer.phone)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700"
        >
          <Phone size={17} />
          Call
        </a>

        <a
          href={getWhatsAppLink(whatsapp)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700"
        >
          <MessageCircle size={17} />
          WhatsApp
        </a>
      </div>
    </article>
  );
};

export default CustomerCard;
