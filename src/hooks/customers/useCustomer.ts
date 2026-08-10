import { useQuery } from "@tanstack/react-query";

import { getCustomerById } from "../../api/customers.api";

import { customerKeys } from "./customer.keys";

export const useCustomer = (customerId: string) => {
  return useQuery({
    queryKey: customerKeys.detail(customerId),

    queryFn: () => getCustomerById(customerId),

    enabled: Boolean(customerId),
  });
};
