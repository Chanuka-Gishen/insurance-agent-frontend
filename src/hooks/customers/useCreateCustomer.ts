import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCustomer } from "../../api/customers.api";

import { customerKeys } from "./customer.keys";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
  });
};
