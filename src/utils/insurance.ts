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

export const formatInsuranceLabel = (value?: string): string => {
  if (!value) {
    return "—";
  }

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
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

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;

  const daysRemaining = Math.ceil(
    (expiry.getTime() - today.getTime()) / msPerDay,
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

  if (daysRemaining === 0) {
    return {
      status: "urgent",
      label: "Expires today",
      daysRemaining,
    };
  }

  if (daysRemaining <= 7) {
    return {
      status: "urgent",
      label: `Expires in ${daysRemaining} days`,
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

export const getDateAfterDays = (days: number): string => {
  const date = new Date();

  date.setDate(date.getDate() + days);

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getTodayDate = (): string => {
  return getDateAfterDays(0);
};
