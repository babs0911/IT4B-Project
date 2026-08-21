import type { ID, Reservation } from '../types'
import { ReservationStatus } from '../types'

interface ReservationCardProps {
  reservation: Omit<Reservation, 'id'> & { id: ID }
  onSelect: () => void
  variant?: 'default' | 'compact'
}

function ReservationCard({ reservation, onSelect, variant = 'default' }: ReservationCardProps) {
  const isCompact = variant === 'compact'
  const statusClasses = {
    [ReservationStatus.Pending]: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    [ReservationStatus.Reserved]: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    [ReservationStatus.Borrowed]: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    [ReservationStatus.Returned]: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  }[reservation.status]

  return (
    <article className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 ${isCompact ? 'space-y-3' : 'space-y-5'}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Reservation</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">#{reservation.id}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}>
          {ReservationStatus[reservation.status]}
        </span>
      </div>

      {!isCompact && (
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Book ID: <span className="font-semibold text-slate-950 dark:text-white">{reservation.bookId}</span>
          </p>
          <p>
            User ID: <span className="font-semibold text-slate-950 dark:text-white">{reservation.userId}</span>
          </p>
          <p>
            Requested: <span className="font-semibold text-slate-950 dark:text-white">{reservation.requestedAt.toLocaleString()}</span>
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onSelect}
        className="w-full rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400"
      >
        {isCompact ? 'View' : 'Select reservation'}
      </button>
    </article>
  )
}

export default ReservationCard