import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCustomerFollowUp } from "../../api/customers.api";

import type { UpdateFollowUpRequest } from "../../types/customer.types";

import { customerKeys } from "./customer.keys";

interface UpdateFollowUpVariables {
  id: string;
  payload: UpdateFollowUpRequest;
}

export const useUpdateFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateFollowUpVariables) =>
      updateCustomerFollowUp(id, payload),

    onSuccess: async (customer) => {
      queryClient.setQueryData(customerKeys.detail(customer._id), customer);

      await queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
  });
};
