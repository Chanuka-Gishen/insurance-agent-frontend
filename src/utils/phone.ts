const normalizePhone = (phone: string): string => {
  return phone.replace(/[^\d+]/g, "");
};

export const getTelLink = (phone: string): string => {
  return `tel:${normalizePhone(phone)}`;
};

export const getWhatsAppLink = (phone: string): string => {
  let normalized = phone.replace(/\D/g, "");

  if (normalized.startsWith("0")) {
    normalized = `94${normalized.slice(1)}`;
  }

  return `https://wa.me/${normalized}`;
};
