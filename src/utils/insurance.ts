export type InsuranceExpiryStatus =
  | "expired"
  | "urgent"
  | "expiring"
  | "normal"
  | "none";

export interface InsuranceExpiryResult {
  status: InsuranceExpiryStatus;
  label: string;
  daysRemaining?: number;
}

const getStartOfToday = () => {
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  return date;
};

export const getInsuranceExpiryStatus = (
  expiryDate?: string,
): InsuranceExpiryResult => {
  if (!expiryDate) {
    return {
      status: "none",
      label: "No expiry date",
    };
  }

  const expiry = new Date(expiryDate);

  if (Number.isNaN(expiry.getTime())) {
    return {
      status: "none",
      label: "No expiry date",
    };
  }

  expiry.setHours(0, 0, 0, 0);

  const today = getStartOfToday();

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const daysRemaining = Math.ceil(
    (expiry.getTime() - today.getTime()) / millisecondsPerDay,
  );

  if (daysRemaining < 0) {
    return {
      status: "expired",
      label: `Expired ${Math.abs(daysRemaining)} day${
        Math.abs(daysRemaining) === 1 ? "" : "s"
      } ago`,
      daysRemaining,
    };
  }

  if (daysRemaining <= 7) {
    return {
      status: "urgent",
      label:
        daysRemaining === 0
          ? "Expires today"
          : `Expires in ${daysRemaining} days`,
      daysRemaining,
    };
  }

  if (daysRemaining <= 30) {
    return {
      status: "expiring",
      label: `Expires in ${daysRemaining} days`,
      daysRemaining,
    };
  }

  return {
    status: "normal",
    label: `Expires in ${daysRemaining} days`,
    daysRemaining,
  };
};

export const formatCurrency = (value?: number): string => {
  if (value === undefined || value === null) {
    return "—";
  }

  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 2,
  }).format(value);
};
