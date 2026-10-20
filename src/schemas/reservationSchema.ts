import { z } from "zod";

export const reservationSchema = z.object({
  bookId: z.string().trim().min(1, "Select a book to reserve."),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;
