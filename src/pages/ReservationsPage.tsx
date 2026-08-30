import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createReservation, fetchReservations } from "@/api/client";
import ReservationCard from "@/components/ReservationCard";
import { reservationSchema, type ReservationFormValues } from "@/schemas/reservationSchema";
import type { ApiReservation } from "@/types";

function ReservationsPage() {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery<ApiReservation[]>({
    queryKey: ["reservations"],
    queryFn: fetchReservations,
  });

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      bookId: "",
      borrowerName: "",
      pickupDate: "",
      notes: "",
    },
    mode: "onSubmit",
  });

  const handleBookIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/\D/g, "");
    form.setValue("bookId", nextValue, { shouldValidate: true, shouldDirty: true });
  };

  const handleBorrowerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ'\-\s]/g, "");
    form.setValue("borrowerName", nextValue, { shouldValidate: true, shouldDirty: true });
  };

  const addReservation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      form.reset();
    },
  });

  const onSubmit = (values: ReservationFormValues) => {
    addReservation.mutate({
      bookId: values.bookId,
      userId: 1,
      status: 0,
      requestedAt: new Date().toISOString(),
    });
  };

  if (isPending) return <div className="animate-pulse p-6">Loading reservations...</div>;
  if (isError) return <div className="rounded-lg bg-red-50 p-4 text-red-700">Could not load reservations.</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Reservations</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6 space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950" noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bookId">Book ID</Label>
            <Input
              id="bookId"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g. 1"
              value={form.watch("bookId")}
              onChange={handleBookIdChange}
            />
            {form.formState.errors.bookId && <p className="text-sm text-red-600">{form.formState.errors.bookId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="borrowerName">Borrower name</Label>
            <Input
              id="borrowerName"
              placeholder="Your full name"
              value={form.watch("borrowerName")}
              onChange={handleBorrowerNameChange}
            />
            {form.formState.errors.borrowerName && <p className="text-sm text-red-600">{form.formState.errors.borrowerName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupDate">Pickup date</Label>
            <Input id="pickupDate" type="date" {...form.register("pickupDate")} />
            {form.formState.errors.pickupDate && <p className="text-sm text-red-600">{form.formState.errors.pickupDate.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" placeholder="Optional notes for pickup" {...form.register("notes")} />
            {form.formState.errors.notes && <p className="text-sm text-red-600">{form.formState.errors.notes.message}</p>}
          </div>
        </div>

        <Button type="submit" disabled={addReservation.isPending} className="w-full md:w-auto">
          {addReservation.isPending ? "Reserving..." : "Reserve book"}
        </Button>
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {(data ?? []).map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={{
              id: reservation.id,
              bookId: Number(reservation.bookId),
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