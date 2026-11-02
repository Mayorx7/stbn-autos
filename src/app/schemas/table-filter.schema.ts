import { CarStatus, CustomerStatus } from "@/config/constants";
import z from "zod";

export const AdminCarFilterSchema = z.object({
  q: z.string().optional(),
  status: z
    .enum(["ALL", ...Object.values(CarStatus)])
    .default("ALL")
    .optional(),
});

export const AdminCustomerFilterSchema = z.object({
  q: z.string().optional(),
  status: z
    .enum(["ALL", ...Object.values(CustomerStatus)])
    .default("ALL")
    .optional(),
});