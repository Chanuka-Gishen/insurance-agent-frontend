import type { PopulatedCustomerInsurance } from "./insurance.types";

export interface DashboardSummary {
  todayFollowUps: number;
  overdueFollowUps: number;
  expiringWithin30Days: number;
  activeCustomers: number;
}

export interface DashboardFollowUpCustomer {
  _id: string;

  fullName: string;

  phone: string;
  secondaryPhone?: string;
  whatsappNumber?: string;

  nic?: string;

  nextFollowUpDate?: string;
  lastContactDate?: string;
  followUpNote?: string;

  customerType: string;
  source: string;

  isActive: boolean;
}

export interface DashboardFollowUpsResponse {
  customers: DashboardFollowUpCustomer[];
  total: number;
}

export interface DashboardRenewalsResponse {
  insurances: PopulatedCustomerInsurance[];
  total: number;
}
