import { useQuery } from "@tanstack/react-query";

import { getInsuranceById } from "../../api/insurances.api";

import { insuranceKeys } from "./insurance.keys";

export const useInsurance = (customerId: string, insuranceId: string) => {
  return useQuery({
    queryKey: insuranceKeys.detail(insuranceId),

    queryFn: () => getInsuranceById(customerId, insuranceId),

    enabled: Boolean(customerId && insuranceId),
  });
};
