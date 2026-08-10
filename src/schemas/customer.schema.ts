import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));

export const createCustomerSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),

  nic: optionalString,

  dateOfBirth: optionalString,

  phone: z.string().trim().min(9, "Enter a valid phone number"),

  secondaryPhone: optionalString,

  whatsappNumber: optionalString,

  email: z.email("Enter a valid email address").optional().or(z.literal("")),

  address: optionalString,

  city: optionalString,

  customerType: z.string().min(1),

  source: z.string().min(1),

  lastContactDate: optionalString,

  nextFollowUpDate: optionalString,

  followUpNote: optionalString,

  notes: optionalString,

  isActive: z.boolean(),
});

export type CreateCustomerFormValues = z.infer<typeof createCustomerSchema>;
