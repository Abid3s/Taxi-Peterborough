import { z } from "zod";

export const quoteFormSchema = z.object({
  direction: z.enum(["to_airport", "from_airport"]),
  pickupPostcode: z
    .string()
    .min(3, { message: "Please enter a valid postcode." })
    .max(8, { message: "Please enter a valid postcode." }),
  airport: z.string({ required_error: "Please select an airport." }),
  // terminal: z.string().optional(), // Will be handled later
  pickupDate: z.date({
    required_error: "A pickup date is required.",
  }),
  pickupTime: z.string({
    required_error: "A pickup time is required.",
  }).regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time format (HH:MM)."
  }),
  vehicle: z.enum(["saloon", "estate", "mpv", "eight"], {
    required_error: "Please select a vehicle type.",
  }),
  passengers: z.coerce.number().min(1, { message: "At least 1 passenger is required." }),
  bags: z.coerce.number().min(0, { message: "Bags cannot be negative." }),
  meetAndGreet: z.boolean().default(false),
  childSeats: z.coerce.number().min(0).max(4).default(0),
  extraStopAddress: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
