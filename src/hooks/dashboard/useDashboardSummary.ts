import { useQuery } from "@tanstack/react-query";

import { getDashboardSummary } from "../../api/dashboard.api";

import { dashboardKeys } from "./dashboard.keys";

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: dashboardKeys.summary(),

    queryFn: getDashboardSummary,
  });
};
