import apiClient from "./axios";

import type { ApiResponse } from "../types/api.types";

import type {
  DashboardFollowUpsResponse,
  DashboardRenewalsResponse,
  DashboardSummary,
} from "../types/dashboard.types";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const { data } =
    await apiClient.get<ApiResponse<DashboardSummary>>("/dashboard/summary");

  if (!data.response) {
    throw new Error("Dashboard summary was not returned.");
  }

  return data.response;
};

export const getDashboardFollowUps = async (
  type: "today" | "overdue",
  limit = 5,
): Promise<DashboardFollowUpsResponse> => {
  const { data } = await apiClient.get<ApiResponse<DashboardFollowUpsResponse>>(
    "/dashboard/follow-ups",
    {
      params: {
        type,
        limit,
      },
    },
  );

  return (
    data.response ?? {
      customers: [],
      total: 0,
    }
  );
};

export const getDashboardRenewals = async (
  days = 30,
  limit = 5,
): Promise<DashboardRenewalsResponse> => {
  const { data } = await apiClient.get<ApiResponse<DashboardRenewalsResponse>>(
    "/dashboard/renewals",
    {
      params: {
        days,
        limit,
      },
    },
  );

  return (
    data.response ?? {
      insurances: [],
      total: 0,
    }
  );
};
