import { ArrowLeft } from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../utils/api.utils";

import InsuranceForm from "../components/insurances/InsuranceForm";

import { INSURANCE_PRODUCTS } from "../constants/insurance.constants";

import { useInsurance } from "../hooks/insurances/useInsurance";

import { useUpdateInsurance } from "../hooks/insurances/useUpdateInsurance";

import type { InsuranceFormValues } from "../schemas/insurance.schema";

import type { UpdateInsuranceRequest } from "../types/insurance.types";

const cleanString = (value?: string) => {
  const cleaned = value?.trim();

  return cleaned || undefined;
};

const toDateInputValue = (value?: string): string => {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
};

const cleanObject = <T extends Record<string, unknown>>(
  object?: T,
): T | undefined => {
  if (!object) {
    return undefined;
  }

  const cleaned = Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null,
    ),
  ) as T;

  return Object.keys(cleaned).length ? cleaned : ({} as T);
};

const EditInsurancePage = () => {
  const { customerId, insuranceId } = useParams<{
    customerId: string;
    insuranceId: string;
  }>();

  const navigate = useNavigate();

  const {
    data: insurance,
    isLoading,
    isError,
    error: insuranceError,
  } = useInsurance(customerId ?? "", insuranceId ?? "");

  const { mutateAsync, isPending, error: updateError } = useUpdateInsurance();

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />

        <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (isError || !insurance || !customerId || !insuranceId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="font-semibold text-red-700">Unable to load insurance</h1>

        <p className="mt-2 text-sm text-red-600">
          {getApiErrorMessage(insuranceError, "Insurance could not be loaded.")}
        </p>

        <Link
          to={`/customers/${customerId ?? ""}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-700"
        >
          <ArrowLeft size={16} />
          Back to customer
        </Link>
      </div>
    );
  }

  const handleSubmit = async (values: InsuranceFormValues) => {
    const product = INSURANCE_PRODUCTS[values.insuranceType].find(
      (item) => item.code === values.productCode,
    );

    if (!product) {
      throw new Error("Selected insurance product is invalid.");
    }

    const payload: UpdateInsuranceRequest = {
      insuranceType: values.insuranceType,

      productCode: product.code,

      productName: product.name,

      insuranceCompany: cleanString(values.insuranceCompany),

      policyNumber: cleanString(values.policyNumber),

      proposalNumber: cleanString(values.proposalNumber),

      premiumAmount: values.premiumAmount,

      insuredValue: values.insuredValue,

      startDate: cleanString(values.startDate),

      expiryDate: cleanString(values.expiryDate),

      status: cleanString(values.status),

      description: cleanString(values.description),

      notes: cleanString(values.notes),
    };

    switch (values.insuranceType) {
      case "motor":
        payload.motorDetails = cleanObject(values.motorDetails) ?? {};

        break;

      case "property":
        payload.propertyDetails = cleanObject(values.propertyDetails) ?? {};

        break;

      case "health":
        payload.healthDetails = cleanObject(values.healthDetails) ?? {};

        break;

      case "marine":
        payload.marineDetails = cleanObject(values.marineDetails) ?? {};

        break;

      case "travel":
        payload.travelDetails = cleanObject(values.travelDetails) ?? {};

        break;

      case "casualty":
        payload.casualtyDetails = cleanObject(values.casualtyDetails) ?? {};

        break;
    }

    const updated = await mutateAsync({
      customerId,
      insuranceId,
      payload,
    });

    navigate(`/customers/${customerId}/insurances/${updated._id}`, {
      replace: true,
    });
  };

  return (
    <div className="pb-4">
      <div className="mb-6">
        <Link
          to={`/customers/${customerId}/insurances/${insuranceId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Insurance Details
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
          Edit Insurance
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update policy and insured asset information.
        </p>
      </div>

      {updateError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {getApiErrorMessage(updateError, "Unable to update insurance.")}
        </div>
      )}

      <InsuranceForm
        defaultValues={{
          insuranceType: insurance.insuranceType,

          productCode: insurance.productCode,

          insuranceCompany: insurance.insuranceCompany ?? "",

          policyNumber: insurance.policyNumber ?? "",

          proposalNumber: insurance.proposalNumber ?? "",

          premiumAmount: insurance.premiumAmount,

          insuredValue: insurance.insuredValue,

          startDate: toDateInputValue(insurance.startDate),

          expiryDate: toDateInputValue(insurance.expiryDate),

          status: insurance.status,

          description: insurance.description ?? "",

          notes: insurance.notes ?? "",

          motorDetails: insurance.motorDetails
            ? {
                ...insurance.motorDetails,

                valuationDate: toDateInputValue(
                  insurance.motorDetails.valuationDate,
                ),
              }
            : {
                isLeased: false,
              },

          propertyDetails: insurance.propertyDetails
            ? {
                ...insurance.propertyDetails,

                valuationDate: toDateInputValue(
                  insurance.propertyDetails.valuationDate,
                ),
              }
            : {},

          healthDetails: insurance.healthDetails ?? {},

          marineDetails: insurance.marineDetails ?? {},

          travelDetails: insurance.travelDetails
            ? {
                ...insurance.travelDetails,

                departureDate: toDateInputValue(
                  insurance.travelDetails.departureDate,
                ),

                returnDate: toDateInputValue(
                  insurance.travelDetails.returnDate,
                ),
              }
            : {},

          casualtyDetails: insurance.casualtyDetails ?? {},
        }}
        isSubmitting={isPending}
        submitLabel="Update Insurance"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditInsurancePage;
