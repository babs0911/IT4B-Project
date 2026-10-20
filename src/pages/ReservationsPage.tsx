import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createReservation, fetchBooks, fetchReservations } from "@/api/client";
import ReservationCard from "@/components/ReservationCard";
import { reservationSchema, type ReservationFormValues } from "@/schemas/reservationSchema";
import type { ApiBook, ApiReservation } from "@/types";

function ReservationsPage() {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery<ApiReservation[]>({
    queryKey: ["reservations"],
    queryFn: fetchReservations,
  });
  const { data: books = [], isPending: isBooksPending, isError: isBooksError } = useQuery<ApiBook[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      bookId: "",
    },
    mode: "onSubmit",
  });

  const addReservation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      form.reset();
    },
  });

  const onSubmit = (values: ReservationFormValues) => {
    addReservation.mutate({ bookId: values.bookId });
  };

  if (isPending || isBooksPending) return <div className="animate-pulse p-6">Loading reservations...</div>;
  if (isError || isBooksError) return <div className="rounded-lg bg-red-50 p-4 text-red-700">Could not load library data.</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Reservations</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6 space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950" noValidate>
        <div className="space-y-2">
          <Label htmlFor="bookId">Book</Label>
          <select id="bookId" className="w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-900" {...form.register("bookId")}>
            <option value="">Select a book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>{book.title} — {book.author}</option>
            ))}
          </select>
          {form.formState.errors.bookId && <p className="text-sm text-red-600">{form.formState.errors.bookId.message}</p>}
        </div>

        {addReservation.isError && <p role="alert" className="text-sm text-red-600">{addReservation.error.message}</p>}
        <Button type="submit" disabled={addReservation.isPending || books.length === 0} className="w-full md:w-auto">
          {addReservation.isPending ? "Reserving..." : "Reserve book"}
        </Button>
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {(data ?? []).map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={{
              id: reservation.id,
              bookId: reservation.bookId,
              userId: reservation.userId,
              status: reservation.status,
              requestedAt: new Date(reservation.requestedAt),
            }}
            onSelect={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default ReservationsPage;