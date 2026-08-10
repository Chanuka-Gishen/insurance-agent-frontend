export interface Customer {
  _id: string;
  fullName: string;

  nic?: string;
  dateOfBirth?: string;

  phone: string;
  secondaryPhone?: string;
  whatsappNumber?: string;
  email?: string;

  address?: string;
  city?: string;

  customerType: string;
  source: string;

  lastContactDate?: string;
  nextFollowUpDate?: string;
  followUpNote?: string;

  notes?: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface CustomerListParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  customerType?: string;
  source?: string;
}

export interface CustomerListResponse {
  customers: Customer[];

  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateCustomerRequest {
  fullName: string;

  nic?: string;
  dateOfBirth?: string;

  phone: string;
  secondaryPhone?: string;
  whatsappNumber?: string;
  email?: string;

  address?: string;
  city?: string;

  customerType?: string;
  source?: string;

  lastContactDate?: string;
  nextFollowUpDate?: string;
  followUpNote?: string;

  notes?: string;
  isActive?: boolean;
}

export interface UpdateCustomerRequest {
  fullName?: string;

  nic?: string;
  dateOfBirth?: string;

  phone?: string;
  secondaryPhone?: string;
  whatsappNumber?: string;
  email?: string;

  address?: string;
  city?: string;

  customerType?: "individual" | "business";

  source?:
    | "existing_customer"
    | "referral"
    | "walk_in"
    | "phone"
    | "social_media"
    | "other";

  lastContactDate?: string;
  nextFollowUpDate?: string;
  followUpNote?: string;

  notes?: string;

  isActive?: boolean;
}

export interface UpdateFollowUpRequest {
  nextFollowUpDate?: string;
  followUpNote?: string;
  lastContactDate?: string;
}
