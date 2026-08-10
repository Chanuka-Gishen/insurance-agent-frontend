export interface CustomerInsurance {
  _id: string;
  customerId: string;

  policyNumber?: string;

  insuranceType: string;
  insuranceCompany?: string;

  description?: string;

  premiumAmount?: number;
  insuredValue?: number;

  startDate?: string;
  expiryDate?: string;

  status: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateInsuranceRequest {
  customerId: string;

  policyNumber?: string;

  insuranceType: string;
  insuranceCompany?: string;

  description?: string;

  premiumAmount?: number;
  insuredValue?: number;

  startDate?: string;
  expiryDate?: string;

  status?: string;

  notes?: string;
}

export interface UpdateInsuranceRequest {
  policyNumber?: string;

  insuranceType?: string;
  insuranceCompany?: string;

  description?: string;

  premiumAmount?: number;
  insuredValue?: number;

  startDate?: string;
  expiryDate?: string;

  status?: string;

  notes?: string;
}
