import { useQuery } from "@tanstack/react-query";

import { getInsurances } from "../../api/insurances.api";

import type { GlobalInsuranceListParams } from "../../types/insurance.types";

import { insuranceKeys } from "./insurance.keys";

export const useInsurances = (params: GlobalInsuranceListParams) => {
  return useQuery({
    queryKey: insuranceKeys.globalList(params),

    queryFn: () => getInsurances(params),

    placeholderData: (previousData) => previousData,
  });
};
