import { ArrowLeft } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import CustomerForm from "../components/customers/CustomerForm";

import { useCreateCustomer } from "../hooks/customers/useCreateCustomer";

import { getApiErrorMessage } from "../utils/api.utils";

import type { CreateCustomerFormValues } from "../schemas/customer.schema";

const cleanOptionalString = (value?: string) => {
  const trimmed = value?.trim();

  return trimmed || undefined;
};

const CreateCustomerPage = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, error } = useCreateCustomer();

  const handleSubmit = async (values: CreateCustomerFormValues) => {
    const customer = await mutateAsync({
      fullName: values.fullName.trim(),

      nic: cleanOptionalString(values.nic),

      dateOfBirth: cleanOptionalString(values.dateOfBirth),

      phone: values.phone.trim(),

      secondaryPhone: cleanOptionalString(values.secondaryPhone),

      whatsappNumber: cleanOptionalString(values.whatsappNumber),

      email: cleanOptionalString(values.email),

      address: cleanOptionalString(values.address),

      city: cleanOptionalString(values.city),

      customerType: values.customerType,

      source: values.source,

      lastContactDate: cleanOptionalString(values.lastContactDate),

      nextFollowUpDate: cleanOptionalString(values.nextFollowUpDate),

      followUpNote: cleanOptionalString(values.followUpNote),

      notes: cleanOptionalString(values.notes),

      isActive: values.isActive,
    });

    navigate(`/customers/${customer._id}`, {
      replace: true,
    });
  };

  return (
    <div className="pb-4">
      <div className="mb-6">
        <Link
          to="/customers"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Customers
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
          Add Customer
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Add a new customer to your insurance tracker.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {getApiErrorMessage(error, "Unable to create customer.")}
        </div>
      )}

      <CustomerForm isSubmitting={isPending} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCustomerPage;
