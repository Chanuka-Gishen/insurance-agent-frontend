import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateInsurance } from "../../api/insurances.api";

import type { UpdateInsuranceRequest } from "../../types/insurance.types";

import { insuranceKeys } from "./insurance.keys";

interface UpdateInsuranceVariables {
  customerId: string;
  insuranceId: string;
  payload: UpdateInsuranceRequest;
}

export const useUpdateInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      insuranceId,
      payload,
    }: UpdateInsuranceVariables) =>
      updateInsurance(customerId, insuranceId, payload),

    onSuccess: async (insurance, variables) => {
      queryClient.setQueryData(
        insuranceKeys.detail(variables.insuranceId),
        insurance,
      );

      await queryClient.invalidateQueries({
        queryKey: insuranceKeys.customerList(variables.customerId),
      });
    },
  });
};
