import type { Book } from '../types'

interface BookCardProps {
  book: Book
  variant?: 'default' | 'compact'
  onSelect: () => void
}

function BookCard({ book, onSelect, variant = 'default' }: BookCardProps) {
  const isCompact = variant === 'compact'

  return (
    <article className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 ${isCompact ? 'space-y-3' : 'space-y-5'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-semibold text-slate-950 dark:text-white ${isCompact ? 'text-base' : 'text-xl'}`}>
            {book.title}
          </h3>
          {!isCompact && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{book.summary}</p>}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${book.availableCopies > 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'}`}>
          {book.availableCopies > 0 ? 'Available' : 'Sold out'}
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          Author
          <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{book.author}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          Genre
          <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{book.genre}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className="w-full rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
      >
        {isCompact ? 'View book' : 'Select this book'}
      </button>
    </article>
  )
}

export default BookCard