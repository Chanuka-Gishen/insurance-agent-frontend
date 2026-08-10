import { ArrowLeft } from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../utils/api.utils";

import CustomerForm from "../components/customers/CustomerForm";

import { useCustomer } from "../hooks/customers/useCustomer";

import { useUpdateCustomer } from "../hooks/customers/useUpdateCustomer";

import type { CreateCustomerFormValues } from "../schemas/customer.schema";

const cleanOptionalString = (value?: string) => {
  const trimmed = value?.trim();

  return trimmed || undefined;
};

const toDateInputValue = (value?: string) => {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
};

const EditCustomerPage = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const {
    data: customer,
    isLoading,
    isError,
    error: customerError,
  } = useCustomer(id ?? "");

  const { mutateAsync, isPending, error: updateError } = useUpdateCustomer();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />

        <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (isError || !customer) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="font-semibold text-red-700">Unable to load customer</h1>

        <p className="mt-2 text-sm text-red-600">
          {getApiErrorMessage(customerError, "Customer could not be loaded.")}
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

  const handleSubmit = async (values: CreateCustomerFormValues) => {
    const updatedCustomer = await mutateAsync({
      id: customer._id,

      payload: {
        fullName: values.fullName.trim(),

        nic: cleanOptionalString(values.nic),

        dateOfBirth: cleanOptionalString(values.dateOfBirth),

        phone: values.phone.trim(),

        secondaryPhone: cleanOptionalString(values.secondaryPhone),

        whatsappNumber: cleanOptionalString(values.whatsappNumber),

        email: cleanOptionalString(values.email),

        address: cleanOptionalString(values.address),

        city: cleanOptionalString(values.city),

        customerType: values.customerType as "individual" | "business",

        source: values.source as
          | "existing_customer"
          | "referral"
          | "walk_in"
          | "phone"
          | "social_media"
          | "other",

        lastContactDate: cleanOptionalString(values.lastContactDate),

        nextFollowUpDate: cleanOptionalString(values.nextFollowUpDate),

        followUpNote: cleanOptionalString(values.followUpNote),

        notes: cleanOptionalString(values.notes),

        isActive: values.isActive,
      },
    });

    navigate(`/customers/${updatedCustomer._id}`, {
      replace: true,
    });
  };

  return (
    <div className="pb-4">
      <div className="mb-6">
        <Link
          to={`/customers/${customer._id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Customer Details
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
          Edit Customer
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update customer information and follow-up details.
        </p>
      </div>

      {updateError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {getApiErrorMessage(updateError, "Unable to update customer.")}
        </div>
      )}

      <CustomerForm
        defaultValues={{
          fullName: customer.fullName,

          nic: customer.nic ?? "",

          dateOfBirth: toDateInputValue(customer.dateOfBirth),

          phone: customer.phone,

          secondaryPhone: customer.secondaryPhone ?? "",

          whatsappNumber: customer.whatsappNumber ?? "",

          email: customer.email ?? "",

          address: customer.address ?? "",

          city: customer.city ?? "",

          customerType: customer.customerType,

          source: customer.source,

          lastContactDate: toDateInputValue(customer.lastContactDate),

          nextFollowUpDate: toDateInputValue(customer.nextFollowUpDate),

          followUpNote: customer.followUpNote ?? "",

          notes: customer.notes ?? "",

          isActive: customer.isActive,
        }}
        isSubmitting={isPending}
        submitLabel="Update Customer"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditCustomerPage;
