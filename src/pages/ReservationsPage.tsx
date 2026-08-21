import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReservationCard from "../components/ReservationCard";
import type { ApiReservation } from "../types";
import { createReservation, fetchReservations } from "../api/client";

function ReservationsPage() {
  const [bookId, setBookId] = useState("");
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery<ApiReservation[]>({ queryKey: ["reservations"], queryFn: fetchReservations });
  const addReservation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      setBookId("");
    },
  });

  if (isPending) return <div className="animate-pulse p-6">Loading reservations...</div>;
  if (isError) return <div className="rounded-lg bg-red-50 p-4 text-red-700">Could not load reservations.</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Reservations</h2>
      <div className="mb-6 flex gap-2">
        <input value={bookId} onChange={(event) => setBookId(event.target.value)} placeholder="Book ID" className="rounded border border-gray-300 p-2" />
        <button disabled={bookId === "" || addReservation.isPending} onClick={() => addReservation.mutate({ bookId, userId: 1, status: 0, requestedAt: new Date().toISOString() })} className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white disabled:bg-gray-400">
          {addReservation.isPending ? "Reserving..." : "Reserve book"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={{ id: reservation.id, bookId: Number(reservation.bookId), userId: reservation.userId, status: reservation.status, requestedAt: new Date(reservation.requestedAt) }} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default ReservationsPage;