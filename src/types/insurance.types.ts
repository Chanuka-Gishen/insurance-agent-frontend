export type InsuranceType =
  | "motor"
  | "property"
  | "health"
  | "marine"
  | "travel"
  | "casualty";

export interface MotorDetails {
  registrationNumber?: string;
  vehicleType?: string;
  make?: string;
  model?: string;
  manufactureYear?: number;
  chassisNumber?: string;
  engineNumber?: string;
  usageType?: string;
  valuation?: number;
  valuationDate?: string;
  isLeased?: boolean;
  leasingCompany?: string;
}

export interface PropertyDetails {
  propertyType?: string;
  address?: string;
  city?: string;
  buildingValue?: number;
  contentsValue?: number;
  valuation?: number;
  valuationDate?: string;
  constructionType?: string;
  constructionYear?: number;
}

export interface HealthDetails {
  planType?: string;
  numberOfMembers?: number;
  coverageLimit?: number;
  relationshipType?: string;
  remarks?: string;
}

export interface MarineDetails {
  cargoType?: string;
  transportMode?: string;
  origin?: string;
  destination?: string;
  vesselName?: string;
  shipmentReference?: string;
  cargoValue?: number;
}

export interface TravelDetails {
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  numberOfTravellers?: number;
  travelPurpose?: string;
  coverageLimit?: number;
}

export interface CasualtyDetails {
  coverageType?: string;
  occupation?: string;
  businessType?: string;
  numberOfEmployees?: number;
  liabilityLimit?: number;
  riskDescription?: string;
}

export interface CustomerInsurance {
  _id: string;
  customerId: string;

  insuranceType: InsuranceType;

  productCode: string;
  productName: string;

  insuranceCompany?: string;

  policyNumber?: string;
  proposalNumber?: string;

  premiumAmount?: number;
  insuredValue?: number;

  startDate?: string;
  expiryDate?: string;

  status: string;

  description?: string;

  motorDetails?: MotorDetails;
  propertyDetails?: PropertyDetails;
  healthDetails?: HealthDetails;
  marineDetails?: MarineDetails;
  travelDetails?: TravelDetails;
  casualtyDetails?: CasualtyDetails;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateInsuranceRequest {
  insuranceType: InsuranceType;

  productCode: string;
  productName: string;

  insuranceCompany?: string;

  policyNumber?: string;
  proposalNumber?: string;

  premiumAmount?: number;
  insuredValue?: number;

  startDate?: string;
  expiryDate?: string;

  status?: string;

  description?: string;

  motorDetails?: MotorDetails;
  propertyDetails?: PropertyDetails;
  healthDetails?: HealthDetails;
  marineDetails?: MarineDetails;
  travelDetails?: TravelDetails;
  casualtyDetails?: CasualtyDetails;

  notes?: string;
}

export interface InsuranceListParams {
  page?: number;
  limit?: number;
  search?: string;

  insuranceType?: InsuranceType;
  productCode?: string;
  insuranceCompany?: string;
  status?: string;
}

export interface CustomerInsuranceListResponse {
  insurances: CustomerInsurance[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type UpdateInsuranceRequest = Partial<CreateInsuranceRequest>;

export interface InsuranceCustomerSummary {
  _id: string;
  fullName: string;
  phone: string;
  secondaryPhone?: string;
  whatsappNumber?: string;
  nic?: string;
  email?: string;
  address?: string;
  city?: string;
}

export type PopulatedCustomerInsurance = Omit<
  CustomerInsurance,
  "customerId"
> & {
  customerId: InsuranceCustomerSummary;
};

export interface GlobalInsuranceListParams {
  page?: number;
  limit?: number;

  search?: string;

  customerId?: string;

  insuranceType?: InsuranceType;
  productCode?: string;
  insuranceCompany?: string;
  status?: string;

  expiryFrom?: string;
  expiryTo?: string;

  startFrom?: string;
  startTo?: string;

  sortBy?:
    | "createdAt"
    | "expiryDate"
    | "startDate"
    | "premiumAmount"
    | "insuredValue";

  sortOrder?: "asc" | "desc";
}

export interface GlobalInsuranceListResponse {
  insurances: PopulatedCustomerInsurance[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
