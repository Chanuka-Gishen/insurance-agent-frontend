import type { InsuranceType } from "../types/insurance.types";

export interface InsuranceProduct {
  code: string;
  name: string;
}

export const INSURANCE_TYPES: {
  value: InsuranceType;
  label: string;
}[] = [
  {
    value: "motor",
    label: "Motor",
  },
  {
    value: "property",
    label: "Property",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "marine",
    label: "Marine",
  },
  {
    value: "travel",
    label: "Travel",
  },
  {
    value: "casualty",
    label: "Casualty",
  },
];

export const INSURANCE_PRODUCTS: Record<InsuranceType, InsuranceProduct[]> = {
  motor: [
    {
      code: "comprehensive",
      name: "Comprehensive Motor",
    },
    {
      code: "third_party",
      name: "Third Party Motor",
    },
    {
      code: "commercial_vehicle",
      name: "Commercial Vehicle",
    },
    {
      code: "motorcycle",
      name: "Motorcycle Insurance",
    },
  ],

  property: [
    {
      code: "fire",
      name: "Fire Insurance",
    },
    {
      code: "home",
      name: "Home Insurance",
    },
    {
      code: "burglary",
      name: "Burglary Insurance",
    },
    {
      code: "commercial_property",
      name: "Commercial Property",
    },
  ],

  health: [
    {
      code: "individual_health",
      name: "Individual Health",
    },
    {
      code: "family_health",
      name: "Family Health",
    },
    {
      code: "hospitalization",
      name: "Hospitalization Cover",
    },
    {
      code: "critical_illness",
      name: "Critical Illness",
    },
  ],

  marine: [
    {
      code: "marine_cargo",
      name: "Marine Cargo",
    },
    {
      code: "hull",
      name: "Marine Hull",
    },
    {
      code: "goods_in_transit",
      name: "Goods in Transit",
    },
    {
      code: "inland_transit",
      name: "Inland Transit",
    },
  ],

  travel: [
    {
      code: "single_trip",
      name: "Single Trip",
    },
    {
      code: "annual_multi_trip",
      name: "Annual Multi Trip",
    },
    {
      code: "student_travel",
      name: "Student Travel",
    },
    {
      code: "business_travel",
      name: "Business Travel",
    },
  ],

  casualty: [
    {
      code: "personal_accident",
      name: "Personal Accident",
    },
    {
      code: "public_liability",
      name: "Public Liability",
    },
    {
      code: "employer_liability",
      name: "Employer Liability",
    },
    {
      code: "professional_indemnity",
      name: "Professional Indemnity",
    },
    {
      code: "workmen_compensation",
      name: "Workmen Compensation",
    },
  ],
};

export const INSURANCE_COMPANIES = [
  {
    value: "fair_first",
    label: "Fairfirst Insurance",
  },
] as const;

export const INSURANCE_STATUS = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "expired",
    label: "Expired",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];
