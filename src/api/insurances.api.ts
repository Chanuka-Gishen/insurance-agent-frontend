import apiClient from "./axios";

import type { ApiResponse } from "../types/api.types";

import type {
  CustomerInsurance,
  CreateInsuranceRequest,
  UpdateInsuranceRequest,
} from "../types/insurance.types";

export const getCustomerInsurances = async (
  customerId: string,
): Promise<CustomerInsurance[]> => {
  const { data } = await apiClient.get<ApiResponse<CustomerInsurance[]>>(
    `/customers/${customerId}/insurances`,
  );

  return data.response ?? [];
};

export const getInsuranceById = async (
  id: string,
  customerId: string,
): Promise<CustomerInsurance> => {
  const { data } = await apiClient.get<ApiResponse<CustomerInsurance>>(
    `/customers/${customerId}/insurances/${id}`,
  );

  if (!data.response) {
    throw new Error("Insurance was not returned.");
  }

  return data.response;
};

export const createInsurance = async (
  customerId: string,
  payload: CreateInsuranceRequest,
): Promise<CustomerInsurance> => {
  const { data } = await apiClient.post<ApiResponse<CustomerInsurance>>(
    `/customers/${customerId}/insurances`,
    payload,
  );

  if (!data.response) {
    throw new Error("Insurance was not returned.");
  }

  return data.response;
};

export const updateInsurance = async (
  id: string,
  customerId: string,
  payload: UpdateInsuranceRequest,
): Promise<CustomerInsurance> => {
  const { data } = await apiClient.patch<ApiResponse<CustomerInsurance>>(
    `/customers/${customerId}/insurances/${id}`,
    payload,
  );

  if (!data.response) {
    throw new Error("Updated insurance was not returned.");
  }

  return data.response;
};
