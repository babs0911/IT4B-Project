import ReservationCard from "../components/ReservationCard";
import { allReservations, allBooks } from "../Data/mockData";
import type { Book } from "../types";

function ReservationsPage() {
  // Map reservations to include book info where possible
  const reservationsWithBook = allReservations.map((r) => ({
    ...r,
    book: allBooks.find((b) => b.id === r.bookId) as Book | undefined,
  }));

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Reservations</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {reservationsWithBook.map((r) => (
          <ReservationCard key={r.id} reservation={r} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default ReservationsPage;
