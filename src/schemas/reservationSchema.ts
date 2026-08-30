import { z } from "zod";

const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'\-\s]+$/;

export const reservationSchema = z
  .object({
    bookId: z
      .string()
      .trim()
      .min(1, "Book ID is required.")
      .regex(/^\d+$/, "Book ID must contain only numbers."),
    borrowerName: z
      .string()
      .trim()
      .min(2, "Borrower name must be at least 2 characters.")
      .max(60, "Borrower name cannot exceed 60 characters.")
      .regex(nameRegex, "Borrower name must contain only letters and spaces."),
    pickupDate: z
      .string()
      .min(1, "Pickup date is required."),
    notes: z
      .string()
      .trim()
      .max(200, "Notes cannot exceed 200 characters.")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => {
    const pickupDate = new Date(data.pickupDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return pickupDate.getTime() >= today.getTime() + 24 * 60 * 60 * 1000;
  }, {
    message: "Pickup date must be at least one day in the future.",
    path: ["pickupDate"],
  });

export type ReservationFormValues = z.infer<typeof reservationSchema>;
