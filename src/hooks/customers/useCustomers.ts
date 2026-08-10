import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "../../api/customers.api";

import type { CustomerListParams } from "../../types/customer.types";

import { customerKeys } from "./customer.keys";

export const useCustomers = (params: CustomerListParams) => {
  return useQuery({
    queryKey: customerKeys.list(params),

    queryFn: () => getCustomers(params),

    placeholderData: (previousData) => previousData,
  });
};
