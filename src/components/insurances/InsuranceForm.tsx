import { useEffect, useRef } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Save, ShieldCheck } from "lucide-react";

import {
  INSURANCE_COMPANIES,
  INSURANCE_PRODUCTS,
  INSURANCE_TYPES,
} from "../../constants/insurance.constants";

import {
  insuranceSchema,
  type InsuranceFormValues,
} from "../../schemas/insurance.schema";

import InsuranceTypeFields from "./InsuranceTypeFields";

interface InsuranceFormProps {
  defaultValues?: Partial<InsuranceFormValues>;

  isSubmitting?: boolean;

  submitLabel?: string;

  onSubmit: (values: InsuranceFormValues) => void | Promise<void>;
}

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const textareaClassName =
  "mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const optionalNumber = {
  setValueAs: (value: string) => (value === "" ? undefined : Number(value)),
};

const InsuranceForm = ({
  defaultValues,
  isSubmitting = false,
  submitLabel = "Create Insurance",
  onSubmit,
}: InsuranceFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InsuranceFormValues>({
    resolver: zodResolver(insuranceSchema),

    defaultValues: {
      insuranceType: undefined,

      productCode: "",

      status: undefined,

      insuranceCompany: "",

      policyNumber: "",
      proposalNumber: "",

      premiumAmount: undefined,

      insuredValue: undefined,

      startDate: "",
      expiryDate: "",

      description: "",
      notes: "",

      motorDetails: {
        isLeased: false,
      },

      propertyDetails: {},
      healthDetails: {},
      marineDetails: {},
      travelDetails: {},
      casualtyDetails: {},

      ...defaultValues,
    },
  });

  const insuranceType = watch("insuranceType");

  const products = insuranceType ? INSURANCE_PRODUCTS[insuranceType] : [];

  const previousInsuranceType = useRef<
    InsuranceFormValues["insuranceType"] | undefined
  >(defaultValues?.insuranceType);

  useEffect(() => {
    if (
      previousInsuranceType.current &&
      previousInsuranceType.current !== insuranceType
    ) {
      setValue("productCode", "");
    }

    previousInsuranceType.current = insuranceType;
  }, [insuranceType, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Insurance Product</h2>

            <p className="text-sm text-slate-500">
              Select the category and policy product.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Insurance Type *
            </label>

            <select {...register("insuranceType")} className={inputClassName}>
              <option value="">Select type</option>

              {INSURANCE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {errors.insuranceType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.insuranceType.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Product *
            </label>

            <select
              {...register("productCode")}
              disabled={!insuranceType}
              className={inputClassName}
            >
              <option value="">
                {insuranceType
                  ? "Select product"
                  : "Select insurance type first"}
              </option>

              {products.map((product) => (
                <option key={product.code} value={product.code}>
                  {product.name}
                </option>
              ))}
            </select>

            {errors.productCode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.productCode.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Policy Information</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Insurance Company">
            <select
              {...register("insuranceCompany")}
              className={inputClassName}
            >
              <option value="">Select insurance company</option>

              {INSURANCE_COMPANIES.map((company) => (
                <option key={company.value} value={company.value}>
                  {company.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Policy Number">
            <input {...register("policyNumber")} className={inputClassName} />
          </Field>

          <Field label="Proposal Number">
            <input {...register("proposalNumber")} className={inputClassName} />
          </Field>

          <div className="md:col-span-2">
            <Field label="Description">
              <textarea
                {...register("description")}
                className={textareaClassName}
              />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Financial Information</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Premium Amount">
            <input
              type="number"
              min="0"
              step="0.01"
              {...register("premiumAmount", optionalNumber)}
              className={inputClassName}
            />
          </Field>

          <Field label="Insured Value">
            <input
              type="number"
              min="0"
              step="0.01"
              {...register("insuredValue", optionalNumber)}
              className={inputClassName}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Policy Period</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Start Date">
            <input
              type="date"
              {...register("startDate")}
              className={inputClassName}
            />
          </Field>

          <Field label="Expiry Date">
            <input
              type="date"
              {...register("expiryDate")}
              className={inputClassName}
            />

            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.expiryDate.message}
              </p>
            )}
          </Field>
        </div>
      </section>

      <InsuranceTypeFields insuranceType={insuranceType} register={register} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Notes</h2>

        <textarea
          {...register("notes")}
          className={textareaClassName}
          placeholder="Additional information..."
        />
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

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => (
  <div>
    <label className="text-sm font-medium text-slate-700">{label}</label>

    {children}
  </div>
);

export default InsuranceForm;
