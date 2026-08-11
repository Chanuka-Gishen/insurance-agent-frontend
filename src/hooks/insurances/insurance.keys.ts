import type { GlobalInsuranceListParams } from "../../types/insurance.types";

export const insuranceKeys = {
  all: ["insurances"] as const,

  lists: () => [...insuranceKeys.all, "list"] as const,

  customerList: (customerId: string) =>
    [...insuranceKeys.lists(), "customer", customerId] as const,

  globalList: (params: GlobalInsuranceListParams) =>
    [...insuranceKeys.lists(), "global", params] as const,

  details: () => [...insuranceKeys.all, "detail"] as const,

  detail: (insuranceId: string) =>
    [...insuranceKeys.details(), insuranceId] as const,
};
