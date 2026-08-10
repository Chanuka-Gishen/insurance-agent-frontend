import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Edit3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Power,
  User,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../utils/api.utils";

import CustomerInfoItem from "../components/customers/CustomerInfoItem";
import FollowUpEditor from "../components/customers/FollowUpEditor";
import InsuranceList from "../components/insurances/InsuranceList";

import { useCustomer } from "../hooks/customers/useCustomer";

import { useUpdateCustomer } from "../hooks/customers/useUpdateCustomer";

import { formatDate, getTodayDateString } from "../utils/dates";

import { formatCustomerSource, formatCustomerType } from "../utils/customer";

import { getFollowUpStatus } from "../utils/followUp";

import { getTelLink, getWhatsAppLink } from "../utils/phone";

const CustomerDetailsPage = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { data: customer, isLoading, isError, error } = useCustomer(id ?? "");

  const { mutateAsync: updateCustomer, isPending: isUpdatingCustomer } =
    useUpdateCustomer();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="h-80 animate-pulse rounded-2xl bg-slate-200 lg:col-span-2" />

          <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError || !customer) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="font-semibold text-red-700">Unable to load customer</h1>

        <p className="mt-2 text-sm text-red-600">
          {getApiErrorMessage(error, "Customer could not be loaded.")}
        </p>

        <Link
          to="/customers"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-700"
        >
          <ArrowLeft size={16} />
          Back to customers
        </Link>
      </div>
    );
  }

  const whatsappNumber = customer.whatsappNumber || customer.phone;

  const followUp = getFollowUpStatus(customer.nextFollowUpDate);

  const handleToggleStatus = async () => {
    await updateCustomer({
      id: customer._id,

      payload: {
        isActive: !customer.isActive,
      },
    });
  };

  const handleMarkContactedToday = async () => {
    await updateCustomer({
      id: customer._id,

      payload: {
        lastContactDate: getTodayDateString(),
      },
    });
  };

  return (
    <div className="pb-6">
      <div className="mb-5">
        <Link
          to="/customers"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Customers
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <User size={26} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-bold text-slate-900">
                  {customer.fullName}
                </h1>

                <span
                  className={[
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    customer.isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500",
                  ].join(" ")}
                >
                  {customer.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {formatCustomerType(customer.customerType)}
                {" • "}
                {formatCustomerSource(customer.source)}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/customers/${customer._id}/edit`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:flex-none"
            >
              <Edit3 size={17} />
              Edit
            </Link>

            <button
              type="button"
              disabled={isUpdatingCustomer}
              onClick={handleToggleStatus}
              className={[
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition sm:flex-none",
                customer.isActive
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
              ].join(" ")}
            >
              <Power size={17} />

              {customer.isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:max-w-lg">
          <a
            href={getTelLink(customer.phone)}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Phone size={18} />
            Call
          </a>

          <a
            href={getWhatsAppLink(whatsappNumber)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-blue-600" />

              <h2 className="font-semibold text-slate-900">
                Contact Information
              </h2>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <CustomerInfoItem
                label="Primary Phone"
                value={
                  <a
                    href={getTelLink(customer.phone)}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.phone}
                  </a>
                }
              />

              <CustomerInfoItem
                label="Secondary Phone"
                value={customer.secondaryPhone}
              />

              <CustomerInfoItem
                label="WhatsApp"
                value={customer.whatsappNumber || customer.phone}
              />

              <CustomerInfoItem
                label="Email"
                value={
                  customer.email ? (
                    <a
                      href={`mailto:${customer.email}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Mail size={14} />

                      {customer.email}
                    </a>
                  ) : (
                    "—"
                  )
                }
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" />

              <h2 className="font-semibold text-slate-900">
                Personal Information
              </h2>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <CustomerInfoItem label="NIC" value={customer.nic} />

              <CustomerInfoItem
                label="Date of Birth"
                value={formatDate(customer.dateOfBirth)}
              />

              <CustomerInfoItem
                label="Customer Type"
                value={formatCustomerType(customer.customerType)}
              />

              <CustomerInfoItem
                label="Source"
                value={formatCustomerSource(customer.source)}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-600" />

              <h2 className="font-semibold text-slate-900">Address</h2>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <CustomerInfoItem label="Address" value={customer.address} />

              <CustomerInfoItem label="City" value={customer.city} />
            </div>
          </section>

          <InsuranceList customerId={customer._id} />

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">Notes</h2>

            <div className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              {customer.notes || "No notes added for this customer."}
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  followUp.status === "overdue"
                    ? "bg-red-50 text-red-600"
                    : followUp.status === "today"
                      ? "bg-amber-50 text-amber-600"
                      : followUp.status === "upcoming"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-500",
                ].join(" ")}
              >
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Next Follow-up
                </p>

                <h2 className="font-semibold text-slate-900">
                  {formatDate(customer.nextFollowUpDate)}
                </h2>
              </div>
            </div>

            <div
              className={[
                "mt-4 rounded-xl px-3 py-2 text-sm font-medium",
                followUp.status === "overdue"
                  ? "bg-red-50 text-red-700"
                  : followUp.status === "today"
                    ? "bg-amber-50 text-amber-700"
                    : followUp.status === "upcoming"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-slate-50 text-slate-500",
              ].join(" ")}
            >
              {followUp.label}
            </div>

            <button
              type="button"
              onClick={handleMarkContactedToday}
              disabled={isUpdatingCustomer}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CheckCircle2 size={18} />

              {isUpdatingCustomer ? "Updating..." : "Mark Contacted Today"}
            </button>

            <div className="mt-5">
              <CustomerInfoItem
                label="Last Contact"
                value={formatDate(customer.lastContactDate)}
              />
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Follow-up Note
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {customer.followUpNote || "No follow-up note."}
              </p>
            </div>
          </section>

          <FollowUpEditor customer={customer} />

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">Record Information</h2>

            <div className="mt-5 space-y-5">
              <CustomerInfoItem
                label="Created"
                value={formatDate(customer.createdAt)}
              />

              <CustomerInfoItem
                label="Last Updated"
                value={formatDate(customer.updatedAt)}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
