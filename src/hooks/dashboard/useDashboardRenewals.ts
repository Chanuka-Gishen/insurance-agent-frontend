import { useQuery } from "@tanstack/react-query";

import { getDashboardRenewals } from "../../api/dashboard.api";

import { dashboardKeys } from "./dashboard.keys";

export const useDashboardRenewals = (days = 30, limit = 5) => {
  return useQuery({
    queryKey: dashboardKeys.renewals(days, limit),

    queryFn: () => getDashboardRenewals(days, limit),
  });
};
