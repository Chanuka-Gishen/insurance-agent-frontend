import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Save } from "lucide-react";

import {
  createCustomerSchema,
  type CreateCustomerFormValues,
} from "../../schemas/customer.schema";

interface CustomerFormProps {
  defaultValues?: Partial<CreateCustomerFormValues>;

  isSubmitting?: boolean;

  submitLabel?: string;

  onSubmit: (values: CreateCustomerFormValues) => void | Promise<void>;
}

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const textareaClassName =
  "mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const CustomerForm = ({
  defaultValues,
  isSubmitting = false,
  submitLabel = "Save Customer",
  onSubmit,
}: CustomerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormValues>({
    resolver: zodResolver(createCustomerSchema),

    defaultValues: {
      fullName: "",
      nic: "",
      dateOfBirth: "",
      phone: "",
      secondaryPhone: "",
      whatsappNumber: "",
      email: "",
      address: "",
      city: "",
      customerType: "individual",
      source: "other",
      lastContactDate: "",
      nextFollowUpDate: "",
      followUpNote: "",
      notes: "",
      isActive: true,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h2 className="font-semibold text-slate-900">Basic Information</h2>

          <p className="mt-1 text-sm text-slate-500">
            Customer identity and classification.
          </p>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Full Name *
            </label>

            <input
              type="text"
              {...register("fullName")}
              className={inputClassName}
              placeholder="Enter customer name"
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">NIC</label>

            <input
              type="text"
              {...register("nic")}
              className={inputClassName}
              placeholder="NIC number"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Date of Birth
            </label>

            <input
              type="date"
              {...register("dateOfBirth")}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Customer Type
            </label>

            <select {...register("customerType")} className={inputClassName}>
              <option value="individual">Individual</option>

              <option value="business">Business</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Source</label>

            <select {...register("source")} className={inputClassName}>
              <option value="referral">Referral</option>

              <option value="social_media">Social Media</option>

              <option value="existing_customer">Existing Customer</option>

              <option value="phone">Phone</option>

              <option value="walk_in">Walk In</option>

              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Contact Information</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Primary Phone *
            </label>

            <input
              type="tel"
              inputMode="tel"
              {...register("phone")}
              className={inputClassName}
              placeholder="0771234567"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Secondary Phone
            </label>

            <input
              type="tel"
              {...register("secondaryPhone")}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              WhatsApp Number
            </label>

            <input
              type="tel"
              {...register("whatsappNumber")}
              className={inputClassName}
              placeholder="Leave empty to use primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>

            <input
              type="email"
              {...register("email")}
              className={inputClassName}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Address
            </label>

            <input
              type="text"
              {...register("address")}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">City</label>

            <input
              type="text"
              {...register("city")}
              className={inputClassName}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h2 className="font-semibold text-slate-900">Follow-up</h2>

          <p className="mt-1 text-sm text-slate-500">
            Optional contact and follow-up details.
          </p>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Last Contact Date
            </label>

            <input
              type="date"
              {...register("lastContactDate")}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Next Follow-up
            </label>

            <input
              type="date"
              {...register("nextFollowUpDate")}
              className={inputClassName}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Follow-up Note
            </label>

            <textarea
              {...register("followUpNote")}
              className={textareaClassName}
              placeholder="Reason for next follow-up..."
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Notes</h2>

        <textarea
          {...register("notes")}
          className={textareaClassName}
          placeholder="Additional information about this customer..."
        />

        <label className="mt-5 flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-4 w-4 rounded border-slate-300 text-blue-600"
          />

          <span className="text-sm font-medium text-slate-700">
            Active customer
          </span>
        </label>
      </section>

      <div className="sticky bottom-20 z-20 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur md:static md:border-0 md:bg-transparent md:p-0 md:shadow-none">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 md:ml-auto md:w-auto"
        >
          <Save size={18} />

          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
