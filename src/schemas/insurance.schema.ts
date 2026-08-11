import { z } from "zod";
import { INSURANCE_STATUS } from "../constants/insurance.constants";

const optionalString = z.string().trim().optional().or(z.literal(""));

const optionalNumber = z.number().min(0, "Value cannot be negative").optional();

const motorDetailsSchema = z.object({
  registrationNumber: optionalString,
  vehicleType: optionalString,
  make: optionalString,
  model: optionalString,
  manufactureYear: optionalNumber,
  chassisNumber: optionalString,
  engineNumber: optionalString,
  usageType: optionalString,
  valuation: optionalNumber,
  valuationDate: optionalString,
  isLeased: z.boolean().optional(),
  leasingCompany: optionalString,
});

const propertyDetailsSchema = z.object({
  propertyType: optionalString,
  address: optionalString,
  city: optionalString,
  buildingValue: optionalNumber,
  contentsValue: optionalNumber,
  valuation: optionalNumber,
  valuationDate: optionalString,
  constructionType: optionalString,
  constructionYear: optionalNumber,
});

const healthDetailsSchema = z.object({
  planType: optionalString,
  numberOfMembers: optionalNumber,
  coverageLimit: optionalNumber,
  relationshipType: optionalString,
  remarks: optionalString,
});

const marineDetailsSchema = z.object({
  cargoType: optionalString,
  transportMode: optionalString,
  origin: optionalString,
  destination: optionalString,
  vesselName: optionalString,
  shipmentReference: optionalString,
  cargoValue: optionalNumber,
});

const travelDetailsSchema = z.object({
  destination: optionalString,
  departureDate: optionalString,
  returnDate: optionalString,
  numberOfTravellers: optionalNumber,
  travelPurpose: optionalString,
  coverageLimit: optionalNumber,
});

const casualtyDetailsSchema = z.object({
  coverageType: optionalString,
  occupation: optionalString,
  businessType: optionalString,
  numberOfEmployees: optionalNumber,
  liabilityLimit: optionalNumber,
  riskDescription: optionalString,
});

export const insuranceSchema = z
  .object({
    insuranceType: z.enum([
      "motor",
      "property",
      "health",
      "marine",
      "travel",
      "casualty",
    ]),

    productCode: z.string().min(1, "Product is required"),

    insuranceCompany: optionalString,

    policyNumber: optionalString,
    proposalNumber: optionalString,

    premiumAmount: optionalNumber,
    insuredValue: optionalNumber,

    startDate: optionalString,
    expiryDate: optionalString,

    status: z.enum(INSURANCE_STATUS.map((e) => e.value)),

    description: optionalString,
    notes: optionalString,

    motorDetails: motorDetailsSchema.optional(),

    propertyDetails: propertyDetailsSchema.optional(),

    healthDetails: healthDetailsSchema.optional(),

    marineDetails: marineDetailsSchema.optional(),

    travelDetails: travelDetailsSchema.optional(),

    casualtyDetails: casualtyDetailsSchema.optional(),
  })
  .superRefine((values, ctx) => {
    if (
      values.startDate &&
      values.expiryDate &&
      new Date(values.expiryDate) < new Date(values.startDate)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["expiryDate"],
        message: "Expiry date cannot be before start date",
      });
    }

    if (
      values.insuranceType === "travel" &&
      values.travelDetails?.departureDate &&
      values.travelDetails?.returnDate &&
      new Date(values.travelDetails.returnDate) <
        new Date(values.travelDetails.departureDate)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["travelDetails", "returnDate"],
        message: "Return date cannot be before departure date",
      });
    }
  });

export type InsuranceFormValues = z.infer<typeof insuranceSchema>;
