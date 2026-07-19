import type { Reservation } from '../types'

// Props typing: explicit interface for component props.
interface ReservationCardProps {
  reservation: Reservation
  onSelect: () => void
}

// Event handler typing: onSelect is a function that takes no arguments and returns void.
function ReservationCard({ reservation, onSelect }: ReservationCardProps) {
  return (
    <article className="card">
      <h3>Reservation #{reservation.id}</h3>
      <p>Book ID: {reservation.bookId}</p>
      <p>User ID: {reservation.userId}</p>
      <p>Status: {reservation.status}</p>
      <p>Requested: {reservation.requestedAt.toLocaleString()}</p>
      <button type="button" onClick={onSelect}>
        Select reservation
      </button>
    </article>
  )
}

export default ReservationCard