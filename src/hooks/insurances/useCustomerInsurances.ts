import { useQuery } from "@tanstack/react-query";

import { getCustomerInsurances } from "../../api/insurances.api";

import { insuranceKeys } from "./insurance.keys";

export const useCustomerInsurances = (customerId: string) => {
  return useQuery({
    queryKey: insuranceKeys.customerList(customerId),

    queryFn: () => getCustomerInsurances(customerId),

    enabled: Boolean(customerId),
  });
};
