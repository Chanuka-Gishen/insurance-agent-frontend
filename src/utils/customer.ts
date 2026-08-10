export const formatCustomerType = (value?: string): string => {
  switch (value) {
    case "individual":
      return "Individual";

    case "business":
      return "Business";

    default:
      return value || "—";
  }
};

export const formatCustomerSource = (value?: string): string => {
  switch (value) {
    case "existing_customer":
      return "Existing Customer";

    case "referral":
      return "Referral";

    case "walk_in":
      return "Walk In";

    case "phone":
      return "Phone";

    case "social_media":
      return "Social Media";

    case "other":
      return "Other";

    default:
      return value || "—";
  }
};
