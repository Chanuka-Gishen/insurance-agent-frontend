import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));

export const customerTypeSchema = z.enum(["individual", "business"]);

export const customerSourceSchema = z.enum([
  "existing_customer",
  "referral",
  "walk_in",
  "phone",
  "social_media",
  "other",
]);

export const createCustomerSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),

  nic: optionalString,

  dateOfBirth: optionalString,

  phone: z.string().trim().min(9, "Enter a valid phone number"),

  secondaryPhone: optionalString,

  whatsappNumber: optionalString,

  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),

  address: optionalString,

  city: optionalString,

  customerType: customerTypeSchema,

  source: customerSourceSchema,

  lastContactDate: optionalString,

  nextFollowUpDate: optionalString,

  followUpNote: optionalString,

  notes: optionalString,

  isActive: z.boolean(),
});

export type CreateCustomerFormValues = z.infer<typeof createCustomerSchema>;
