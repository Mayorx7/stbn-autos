import {
  BodyType,
  Colour,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@/config/constants";
import { z } from "zod";

export const CarTaxonomyAISchema = z.object({
  year: z.number().describe("The year of the vehicle"),
  makeId: z.number().nullable().describe("The make ID of the vehicle"),
  make: z.string().describe("The make of the vehicle"),
  modelId: z.number().nullable().describe("The model ID of the vehicle"),
  model: z.string().describe("The model of the vehicle"),
  modelVariantId: z
    .number()
    .nullable()
    .describe("The model variant ID of the vehicle"),
  modelVariant: z
    .string()
    .nullable()
    .describe("The model variant of the vehicle"),
});

export const CarDetailsAISchema = z.object({
  description: z
    .string()
    .describe(
      "The description of the vehicle. Ensure it is 50 words or less and does not contain any HTML tags."
    ),
  vrm: z
    .string()
    .describe(
      "The vehicle registration mark. If unable to detect use 'UNKNOWN'"
    ),
  odoReading: z.number().describe("The odometer reading of the vehicle"),
  doors: z.number().describe("The number of doors on the vehicle"),
  seats: z.number().describe("The number of seats in the vehicle"),
  ulezCompliance: z
    .nativeEnum(ULEZCompliance)
    .describe("The ULEZ Compliance status of the vehicle"),
  transmission: z
    .nativeEnum(Transmission)
    .describe("The transmission of the vehicle"),
  colour: z.nativeEnum(Colour).describe("The colour of the vehicle"),
  fuelType: z.nativeEnum(FuelType).describe("The fuel type of the vehicle"),
  bodyType: z.nativeEnum(BodyType).describe("The body type of the vehicle"),
  odoUnit: z.nativeEnum(OdoUnit).describe("The odometer unit of the vehicle"),
});

export const CarAISchema = CarDetailsAISchema.merge(
  CarTaxonomyAISchema
).extend({
  title: z.string().describe("The title of the vehicle"),
  image: z.string().url().describe("The image of the vehicle"),
});

export type CarAI = z.infer<typeof CarAISchema>;