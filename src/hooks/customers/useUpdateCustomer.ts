import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCustomer } from "../../api/customers.api";

import type { UpdateCustomerRequest } from "../../types/customer.types";

import { customerKeys } from "./customer.keys";

interface UpdateCustomerVariables {
  id: string;
  payload: UpdateCustomerRequest;
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateCustomerVariables) =>
      updateCustomer(id, payload),

    onSuccess: async (customer) => {
      queryClient.setQueryData(customerKeys.detail(customer._id), customer);

      await queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
  });
};
