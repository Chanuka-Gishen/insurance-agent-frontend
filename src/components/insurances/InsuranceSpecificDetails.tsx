import { Building2, Car, HeartPulse, Plane, Ship, Shield } from "lucide-react";

import type { CustomerInsurance } from "../../types/insurance.types";

import { formatDate } from "../../utils/dates";

import { formatCurrency, formatInsuranceLabel } from "../../utils/insurance";

import InsuranceInfoItem from "./InsuranceInfoItem";

interface Props {
  insurance: CustomerInsurance;
}

const InsuranceSpecificDetails = ({ insurance }: Props) => {
  if (insurance.insuranceType === "motor" && insurance.motorDetails) {
    const details = insurance.motorDetails;

    return (
      <Section title="Motor Details" icon={<Car size={19} />}>
        <InsuranceInfoItem
          label="Registration Number"
          value={details.registrationNumber}
        />

        <InsuranceInfoItem
          label="Vehicle Type"
          value={formatInsuranceLabel(details.vehicleType)}
        />

        <InsuranceInfoItem label="Make" value={details.make} />

        <InsuranceInfoItem label="Model" value={details.model} />

        <InsuranceInfoItem
          label="Manufacture Year"
          value={details.manufactureYear}
        />

        <InsuranceInfoItem
          label="Usage Type"
          value={formatInsuranceLabel(details.usageType)}
        />

        <InsuranceInfoItem
          label="Chassis Number"
          value={details.chassisNumber}
        />

        <InsuranceInfoItem label="Engine Number" value={details.engineNumber} />

        <InsuranceInfoItem
          label="Valuation"
          value={formatCurrency(details.valuation)}
        />

        <InsuranceInfoItem
          label="Valuation Date"
          value={formatDate(details.valuationDate)}
        />

        <InsuranceInfoItem
          label="Leased"
          value={details.isLeased ? "Yes" : "No"}
        />

        <InsuranceInfoItem
          label="Leasing Company"
          value={details.leasingCompany}
        />
      </Section>
    );
  }

  if (insurance.insuranceType === "property" && insurance.propertyDetails) {
    const details = insurance.propertyDetails;

    return (
      <Section title="Property Details" icon={<Building2 size={19} />}>
        <InsuranceInfoItem
          label="Property Type"
          value={formatInsuranceLabel(details.propertyType)}
        />

        <InsuranceInfoItem label="City" value={details.city} />

        <InsuranceInfoItem label="Address" value={details.address} />

        <InsuranceInfoItem
          label="Building Value"
          value={formatCurrency(details.buildingValue)}
        />

        <InsuranceInfoItem
          label="Contents Value"
          value={formatCurrency(details.contentsValue)}
        />

        <InsuranceInfoItem
          label="Valuation"
          value={formatCurrency(details.valuation)}
        />

        <InsuranceInfoItem
          label="Valuation Date"
          value={formatDate(details.valuationDate)}
        />

        <InsuranceInfoItem
          label="Construction Type"
          value={formatInsuranceLabel(details.constructionType)}
        />

        <InsuranceInfoItem
          label="Construction Year"
          value={details.constructionYear}
        />
      </Section>
    );
  }

  if (insurance.insuranceType === "health" && insurance.healthDetails) {
    const details = insurance.healthDetails;

    return (
      <Section title="Health Details" icon={<HeartPulse size={19} />}>
        <InsuranceInfoItem
          label="Plan Type"
          value={formatInsuranceLabel(details.planType)}
        />

        <InsuranceInfoItem
          label="Number of Members"
          value={details.numberOfMembers}
        />

        <InsuranceInfoItem
          label="Coverage Limit"
          value={formatCurrency(details.coverageLimit)}
        />

        <InsuranceInfoItem
          label="Relationship Type"
          value={formatInsuranceLabel(details.relationshipType)}
        />

        <div className="sm:col-span-2">
          <InsuranceInfoItem label="Remarks" value={details.remarks} />
        </div>
      </Section>
    );
  }

  if (insurance.insuranceType === "marine" && insurance.marineDetails) {
    const details = insurance.marineDetails;

    return (
      <Section title="Marine Details" icon={<Ship size={19} />}>
        <InsuranceInfoItem
          label="Cargo Type"
          value={formatInsuranceLabel(details.cargoType)}
        />

        <InsuranceInfoItem
          label="Transport Mode"
          value={formatInsuranceLabel(details.transportMode)}
        />

        <InsuranceInfoItem label="Origin" value={details.origin} />

        <InsuranceInfoItem label="Destination" value={details.destination} />

        <InsuranceInfoItem label="Vessel Name" value={details.vesselName} />

        <InsuranceInfoItem
          label="Shipment Reference"
          value={details.shipmentReference}
        />

        <InsuranceInfoItem
          label="Cargo Value"
          value={formatCurrency(details.cargoValue)}
        />
      </Section>
    );
  }

  if (insurance.insuranceType === "travel" && insurance.travelDetails) {
    const details = insurance.travelDetails;

    return (
      <Section title="Travel Details" icon={<Plane size={19} />}>
        <InsuranceInfoItem label="Destination" value={details.destination} />

        <InsuranceInfoItem
          label="Travel Purpose"
          value={formatInsuranceLabel(details.travelPurpose)}
        />

        <InsuranceInfoItem
          label="Departure Date"
          value={formatDate(details.departureDate)}
        />

        <InsuranceInfoItem
          label="Return Date"
          value={formatDate(details.returnDate)}
        />

        <InsuranceInfoItem
          label="Travellers"
          value={details.numberOfTravellers}
        />

        <InsuranceInfoItem
          label="Coverage Limit"
          value={formatCurrency(details.coverageLimit)}
        />
      </Section>
    );
  }

  if (insurance.insuranceType === "casualty" && insurance.casualtyDetails) {
    const details = insurance.casualtyDetails;

    return (
      <Section title="Casualty Details" icon={<Shield size={19} />}>
        <InsuranceInfoItem
          label="Coverage Type"
          value={formatInsuranceLabel(details.coverageType)}
        />

        <InsuranceInfoItem label="Occupation" value={details.occupation} />

        <InsuranceInfoItem
          label="Business Type"
          value={formatInsuranceLabel(details.businessType)}
        />

        <InsuranceInfoItem
          label="Employees"
          value={details.numberOfEmployees}
        />

        <InsuranceInfoItem
          label="Liability Limit"
          value={formatCurrency(details.liabilityLimit)}
        />

        <div className="sm:col-span-2">
          <InsuranceInfoItem
            label="Risk Description"
            value={details.riskDescription}
          />
        </div>
      </Section>
    );
  }

  return null;
};

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({ title, icon, children }: SectionProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <h2 className="font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
};

export default InsuranceSpecificDetails;
