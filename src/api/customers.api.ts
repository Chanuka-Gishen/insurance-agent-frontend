import apiClient from "./axios";

import type { ApiResponse } from "../types/api.types";

import type {
  CreateCustomerRequest,
  Customer,
  CustomerListParams,
  CustomerListResponse,
} from "../types/customer.types";

export const getCustomers = async (
  params: CustomerListParams = {},
): Promise<CustomerListResponse> => {
  const { data } = await apiClient.get<ApiResponse<CustomerListResponse>>(
    "/customers",
    {
      params,
    },
  );

  return (
    data.response ?? {
      customers: [],
    }
  );
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  const { data } = await apiClient.get<ApiResponse<Customer>>(
    `/customers/${id}`,
  );

  if (!data.response) {
    throw new Error("Customer was not returned.");
  }

  return data.response;
};

export const createCustomer = async (
  payload: CreateCustomerRequest,
): Promise<Customer> => {
  const { data } = await apiClient.post<ApiResponse<Customer>>(
    "/customers",
    payload,
  );

  if (!data.response) {
    throw new Error("Customer was not returned.");
  }

  return data.response;
};
