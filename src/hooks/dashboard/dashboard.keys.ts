export const dashboardKeys = {
  all: ["dashboard"] as const,

  summary: () => [...dashboardKeys.all, "summary"] as const,

  followUps: (type: "today" | "overdue", limit: number) =>
    [...dashboardKeys.all, "follow-ups", type, limit] as const,

  renewals: (days: number, limit: number) =>
    [...dashboardKeys.all, "renewals", days, limit] as const,
};
