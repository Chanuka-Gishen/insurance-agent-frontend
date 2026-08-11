import type { UseFormRegister } from "react-hook-form";

import type { InsuranceFormValues } from "../../schemas/insurance.schema";

interface Props {
  insuranceType: InsuranceFormValues["insuranceType"] | undefined;

  register: UseFormRegister<InsuranceFormValues>;
}

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const textareaClassName =
  "mt-2 min-h-24 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const numberOptions = {
  setValueAs: (value: string) => (value === "" ? undefined : Number(value)),
};

const InsuranceTypeFields = ({ insuranceType, register }: Props) => {
  if (!insuranceType) {
    return null;
  }

  if (insuranceType === "motor") {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Motor Details</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Registration Number">
            <input
              {...register("motorDetails.registrationNumber")}
              className={inputClassName}
            />
          </Field>

          <Field label="Vehicle Type">
            <input
              {...register("motorDetails.vehicleType")}
              className={inputClassName}
            />
          </Field>

          <Field label="Make">
            <input
              {...register("motorDetails.make")}
              className={inputClassName}
            />
          </Field>

          <Field label="Model">
            <input
              {...register("motorDetails.model")}
              className={inputClassName}
            />
          </Field>

          <Field label="Manufacture Year">
            <input
              type="number"
              {...register("motorDetails.manufactureYear", numberOptions)}
              className={inputClassName}
            />
          </Field>

          <Field label="Usage Type">
            <input
              {...register("motorDetails.usageType")}
              className={inputClassName}
            />
          </Field>

          <Field label="Chassis Number">
            <input
              {...register("motorDetails.chassisNumber")}
              className={inputClassName}
            />
          </Field>

          <Field label="Engine Number">
            <input
              {...register("motorDetails.engineNumber")}
              className={inputClassName}
            />
          </Field>

          <Field label="Valuation">
            <input
              type="number"
              min="0"
              {...register("motorDetails.valuation", numberOptions)}
              className={inputClassName}
            />
          </Field>

          <Field label="Valuation Date">
            <input
              type="date"
              {...register("motorDetails.valuationDate")}
              className={inputClassName}
            />
          </Field>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register("motorDetails.isLeased")}
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />

              <span className="text-sm font-medium text-slate-700">
                Vehicle is leased
              </span>
            </label>
          </div>

          <Field label="Leasing Company">
            <input
              {...register("motorDetails.leasingCompany")}
              className={inputClassName}
            />
          </Field>
        </div>
      </section>
    );
  }

  if (insuranceType === "property") {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Property Details</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Property Type">
            <input
              {...register("propertyDetails.propertyType")}
              className={inputClassName}
            />
          </Field>

          <Field label="City">
            <input
              {...register("propertyDetails.city")}
              className={inputClassName}
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Address">
              <input
                {...register("propertyDetails.address")}
                className={inputClassName}
              />
            </Field>
          </div>

          <Field label="Building Value">
            <input
              type="number"
              min="0"
              {...register("propertyDetails.buildingValue", numberOptions)}
              className={inputClassName}
            />
          </Field>

          <Field label="Contents Value">
            <input
              type="number"
              min="0"
              {...register("propertyDetails.contentsValue", numberOptions)}
              className={inputClassName}
            />
          </Field>

          <Field label="Valuation">
            <input
              type="number"
              min="0"
              {...register("propertyDetails.valuation", numberOptions)}
              className={inputClassName}
            />
          </Field>

          <Field label="Valuation Date">
            <input
              type="date"
              {...register("propertyDetails.valuationDate")}
              className={inputClassName}
            />
          </Field>

          <Field label="Construction Type">
            <input
              {...register("propertyDetails.constructionType")}
              className={inputClassName}
            />
          </Field>

          <Field label="Construction Year">
            <input
              type="number"
              {...register("propertyDetails.constructionYear", numberOptions)}
              className={inputClassName}
            />
          </Field>
        </div>
      </section>
    );
  }

  if (insuranceType === "health") {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Health Details</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Plan Type">
            <input
              {...register("healthDetails.planType")}
              className={inputClassName}
            />
          </Field>

          <Field label="Number of Members">
            <input
              type="number"
              min="0"
              {...register("healthDetails.numberOfMembers", numberOptions)}
              className={inputClassName}
            />
          </Field>

          <Field label="Coverage Limit">
            <input
              type="number"
              min="0"
              {...register("healthDetails.coverageLimit", numberOptions)}
              className={inputClassName}
            />
          </Field>

          <Field label="Relationship Type">
            <input
              {...register("healthDetails.relationshipType")}
              className={inputClassName}
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Remarks">
              <textarea
                {...register("healthDetails.remarks")}
                className={textareaClassName}
              />
            </Field>
          </div>
        </div>
      </section>
    );
  }

  if (insuranceType === "marine") {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Marine Details</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Cargo Type">
            <input
              {...register("marineDetails.cargoType")}
              className={inputClassName}
            />
          </Field>

          <Field label="Transport Mode">
            <input
              {...register("marineDetails.transportMode")}
              className={inputClassName}
            />
          </Field>

          <Field label="Origin">
            <input
              {...register("marineDetails.origin")}
              className={inputClassName}
            />
          </Field>

          <Field label="Destination">
            <input
              {...register("marineDetails.destination")}
              className={inputClassName}
            />
          </Field>

          <Field label="Vessel Name">
            <input
              {...register("marineDetails.vesselName")}
              className={inputClassName}
            />
          </Field>

          <Field label="Shipment Reference">
            <input
              {...register("marineDetails.shipmentReference")}
              className={inputClassName}
            />
          </Field>

          <Field label="Cargo Value">
            <input
              type="number"
              min="0"
              {...register("marineDetails.cargoValue", numberOptions)}
              className={inputClassName}
            />
          </Field>
        </div>
      </section>
    );
  }

  if (insuranceType === "travel") {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Travel Details</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field label="Destination">
            <input
              {...register("travelDetails.destination")}
              className={inputClassName}
            />
          </Field>

          <Field label="Travel Purpose">
            <input
              {...register("travelDetails.travelPurpose")}
              className={inputClassName}
            />
          </Field>

          <Field label="Departure Date">
            <input
              type="date"
              {...register("travelDetails.departureDate")}
              className={inputClassName}
            />
          </Field>

          <Field label="Return Date">
            <input
              type="date"
              {...register("travelDetails.returnDate")}
              className={inputClassName}
            />
          </Field>

          <Field label="Number of Travellers">
            <input
              type="number"
              min="0"
              {...register("travelDetails.numberOfTravellers", numberOptions)}
              className={inputClassName}
            />
          </Field>

          <Field label="Coverage Limit">
            <input
              type="number"
              min="0"
              {...register("travelDetails.coverageLimit", numberOptions)}
              className={inputClassName}
            />
          </Field>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold text-slate-900">Casualty Details</h2>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Coverage Type">
          <input
            {...register("casualtyDetails.coverageType")}
            className={inputClassName}
          />
        </Field>

        <Field label="Occupation">
          <input
            {...register("casualtyDetails.occupation")}
            className={inputClassName}
          />
        </Field>

        <Field label="Business Type">
          <input
            {...register("casualtyDetails.businessType")}
            className={inputClassName}
          />
        </Field>

        <Field label="Number of Employees">
          <input
            type="number"
            min="0"
            {...register("casualtyDetails.numberOfEmployees", numberOptions)}
            className={inputClassName}
          />
        </Field>

        <Field label="Liability Limit">
          <input
            type="number"
            min="0"
            {...register("casualtyDetails.liabilityLimit", numberOptions)}
            className={inputClassName}
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Risk Description">
            <textarea
              {...register("casualtyDetails.riskDescription")}
              className={textareaClassName}
            />
          </Field>
        </div>
      </div>
    </section>
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

export default InsuranceTypeFields;
