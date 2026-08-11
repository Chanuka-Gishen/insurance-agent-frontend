import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInsurance } from "../../api/insurances.api";

import type { CreateInsuranceRequest } from "../../types/insurance.types";

import { insuranceKeys } from "./insurance.keys";

interface CreateInsuranceVariables {
  customerId: string;
  payload: CreateInsuranceRequest;
}

export const useCreateInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, payload }: CreateInsuranceVariables) =>
      createInsurance(customerId, payload),

    onSuccess: async (_insurance, variables) => {
      await queryClient.invalidateQueries({
        queryKey: insuranceKeys.customerList(variables.customerId),
      });
    },
  });
};
