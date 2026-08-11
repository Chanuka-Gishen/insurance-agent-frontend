import { useQuery } from "@tanstack/react-query";

import { getDashboardFollowUps } from "../../api/dashboard.api";

import { dashboardKeys } from "./dashboard.keys";

export const useDashboardFollowUps = (type: "today" | "overdue", limit = 5) => {
  return useQuery({
    queryKey: dashboardKeys.followUps(type, limit),

    queryFn: () => getDashboardFollowUps(type, limit),
  });
};
