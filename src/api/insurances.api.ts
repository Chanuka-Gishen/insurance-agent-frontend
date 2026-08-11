import apiClient from "./axios";

import type { ApiResponse } from "../types/api.types";

import type {
  CreateInsuranceRequest,
  CustomerInsurance,
  CustomerInsuranceListResponse,
  GlobalInsuranceListParams,
  GlobalInsuranceListResponse,
  InsuranceListParams,
  UpdateInsuranceRequest,
} from "../types/insurance.types";

interface CreateInsuranceResponse {
  insurance: CustomerInsurance;
}

export const getCustomerInsurances = async (
  customerId: string,
  params: InsuranceListParams = {},
): Promise<CustomerInsuranceListResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<CustomerInsuranceListResponse>
  >(`/customers/${customerId}/insurances`, {
    params,
  });

  return (
    data.response ?? {
      insurances: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
    }
  );
};

export const createInsurance = async (
  customerId: string,
  payload: CreateInsuranceRequest,
): Promise<CustomerInsurance> => {
  const { data } = await apiClient.post<ApiResponse<CreateInsuranceResponse>>(
    `/customers/${customerId}/insurances`,
    payload,
  );

  if (!data.response?.insurance) {
    throw new Error("Created insurance was not returned.");
  }

  return data.response.insurance;
};

export const getInsuranceById = async (
  customerId: string,
  insuranceId: string,
): Promise<CustomerInsurance> => {
  const { data } = await apiClient.get<ApiResponse<CustomerInsurance>>(
    `/customers/${customerId}/insurances/${insuranceId}`,
  );

  if (!data.response) {
    throw new Error("Insurance was not returned.");
  }

  return data.response;
};

export const updateInsurance = async (
  customerId: string,
  insuranceId: string,
  payload: UpdateInsuranceRequest,
): Promise<CustomerInsurance> => {
  const { data } = await apiClient.put<ApiResponse<CustomerInsurance>>(
    `/customers/${customerId}/insurances/${insuranceId}`,
    payload,
  );

  if (!data.response) {
    throw new Error("Updated insurance was not returned.");
  }

  return data.response;
};

export const getInsurances = async (
  params: GlobalInsuranceListParams = {},
): Promise<GlobalInsuranceListResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<GlobalInsuranceListResponse>
  >("/insurances", {
    params,
  });

  return (
    data.response ?? {
      insurances: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
    }
  );
};
