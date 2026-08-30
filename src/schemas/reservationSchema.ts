import { z } from "zod";

export const reservationSchema = z
  .object({
    bookId: z
      .string()
      .trim()
      .min(1, "Book ID is required."),
    borrowerName: z
      .string()
      .trim()
      .min(2, "Borrower name must be at least 2 characters.")
      .max(60, "Borrower name cannot exceed 60 characters."),
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
  })
  .refine((data) => data.borrowerName.trim().toLowerCase() !== data.bookId.trim().toLowerCase(), {
    message: "Borrower name and book ID must be different.",
    path: ["borrowerName"],
  });

export type ReservationFormValues = z.infer<typeof reservationSchema>;
