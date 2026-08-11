import { ArrowLeft } from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../utils/api.utils";

import InsuranceForm from "../components/insurances/InsuranceForm";

import { INSURANCE_PRODUCTS } from "../constants/insurance.constants";

import { useCreateInsurance } from "../hooks/insurances/useCreateInsurance";

import type { InsuranceFormValues } from "../schemas/insurance.schema";

import type { CreateInsuranceRequest } from "../types/insurance.types";

const cleanString = (value?: string) => {
  const cleaned = value?.trim();

  return cleaned || undefined;
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

const CreateInsurancePage = () => {
  const { customerId } = useParams<{
    customerId: string;
  }>();

  const navigate = useNavigate();

  const { mutateAsync, isPending, error } = useCreateInsurance();

  if (!customerId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
        Customer ID is missing.
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

    const payload: CreateInsuranceRequest = {
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

      status: values.status,

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

    await mutateAsync({
      customerId,
      payload,
    });

    navigate(`/customers/${customerId}`, {
      replace: true,
    });
  };

  return (
    <div className="pb-4">
      <div className="mb-6">
        <Link
          to={`/customers/${customerId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Customer Details
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
          Add Insurance
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Add a new insurance policy for this customer.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {getApiErrorMessage(error, "Unable to create insurance.")}
        </div>
      )}

      <InsuranceForm isSubmitting={isPending} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateInsurancePage;
