import { useQuery } from "@tanstack/react-query";
import { fetchBooks, fetchReservations } from "@/api/client";
import type { ApiBook, ApiReservation } from "@/types";

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

function DashboardPage() {
  const { data: books = [], isPending: isBooksPending, isError: isBooksError } = useQuery<ApiBook[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const { data: reservations = [], isPending: isReservationsPending, isError: isReservationsError } = useQuery<ApiReservation[]>({
    queryKey: ["reservations"],
    queryFn: fetchReservations,
  });

  const totalAvailableCopies = books.reduce((sum, book) => sum + Number(book.availableCopies ?? 0), 0);
  const pendingReservations = reservations.filter((reservation) => Number(reservation.status) === 0).length;
  const activeReservations = reservations.filter((reservation) => Number(reservation.status) === 1).length;

  if (isBooksPending || isReservationsPending) {
    return <div className="animate-pulse p-6">Loading library dashboard...</div>;
  }

  if (isBooksError || isReservationsError) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">Could not load library data.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Library overview</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Books in catalog" value={String(books.length)} accent="text-slate-900 dark:text-white" />
        <StatCard label="Available copies" value={String(totalAvailableCopies)} accent="text-emerald-600 dark:text-emerald-400" />
        <StatCard label="Pending reservations" value={String(pendingReservations)} accent="text-amber-600 dark:text-amber-400" />
        <StatCard label="Active reservations" value={String(activeReservations)} accent="text-sky-600 dark:text-sky-400" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Recent reservation activity</h3>

        <div className="space-y-3">
          {reservations.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No reservations yet.</p>
          ) : (
            reservations.slice(0, 5).map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Reservation #{reservation.id}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Book ID: {reservation.bookId}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    Number(reservation.status) === 0
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      : "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                  }`}
                >
                  {Number(reservation.status) === 0 ? "Pending" : "Reserved"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;