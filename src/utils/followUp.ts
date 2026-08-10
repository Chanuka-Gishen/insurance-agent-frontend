export type FollowUpStatus = "none" | "overdue" | "today" | "upcoming";

export interface FollowUpStatusResult {
  status: FollowUpStatus;
  label: string;
}

export const getFollowUpStatus = (value?: string): FollowUpStatusResult => {
  if (!value) {
    return {
      status: "none",
      label: "No follow-up scheduled",
    };
  }

  const followUpDate = new Date(value);

  if (Number.isNaN(followUpDate.getTime())) {
    return {
      status: "none",
      label: "No follow-up scheduled",
    };
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(followUpDate);

  target.setHours(0, 0, 0, 0);

  if (target.getTime() < today.getTime()) {
    return {
      status: "overdue",
      label: "Overdue",
    };
  }

  if (target.getTime() === today.getTime()) {
    return {
      status: "today",
      label: "Due today",
    };
  }

  return {
    status: "upcoming",
    label: "Upcoming",
  };
};
