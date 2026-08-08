import React, { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import BookCard from './components/BookCard'
import ReservationCard from './components/ReservationCard'
import UserCard from './components/UserCard'
import usePrevious from './Hooks/UsePrevious'
import useToggle from './Hooks/UseToggle'
import type { Book, Reservation, User } from './types'
import { ReservationStatus } from './types'

const mockUsers: User[] = [
  { id: 1, name: 'Ana Santos', email: 'ana@example.com', role: 'student', isActive: true },
  { id: 2, name: 'Ben Cruz', email: 'ben@example.com', role: 'librarian', isActive: true },
  { id: 3, name: 'Cleo Rivera', email: 'cleo@example.com', role: 'admin', isActive: true },
]

const mockBooks: Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Programming',
    availableCopies: 2,
    reservedCount: 1,
    summary: 'A practical guide to writing readable software.',
    tags: ['programming', 'best-practices'],
  },
  {
    id: 2,
    title: "You Don't Know JS",
    author: 'Kyle Simpson',
    genre: 'Programming',
    availableCopies: 1,
    reservedCount: 0,
    summary: 'A deep dive into JavaScript fundamentals.',
    tags: ['javascript', 'advanced'],
  },
  {
    id: 3,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    genre: 'Software Engineering',
    availableCopies: 3,
    reservedCount: 2,
    summary: 'Practical advice for modern software development teams.',
    tags: ['software', 'career'],
  },
]

const mockReservations: Reservation[] = [
  {
    id: 101,
    bookId: 1,
    userId: 1,
    status: ReservationStatus.Pending,
    requestedAt: new Date('2026-07-18T08:30:00'),
  },
  {
    id: 102,
    bookId: 2,
    userId: 1,
    status: ReservationStatus.Reserved,
    requestedAt: new Date('2026-07-18T09:15:00'),
  },
  {
    id: 103,
    bookId: 3,
    userId: 3,
    status: ReservationStatus.Borrowed,
    requestedAt: new Date('2026-07-19T10:00:00'),
  },
]

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError] = useState<boolean>(false)
  const [showDetails, toggleDetails] = useToggle(false)
  const [isDarkMode, toggleDarkMode] = useToggle(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const previousSearch = usePrevious(searchTerm)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUsers(mockUsers)
      setBooks(mockBooks)
      setReservations(mockReservations)
      setSelectedUser(mockUsers[0])
      setSelectedBook(mockBooks[0])
      setSelectedReservation(mockReservations[0])
      setIsLoading(false)
    }, 700)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      searchInputRef.current?.focus()
    }
  }, [isLoading])

  const availabilityMessage = useMemo(() => {
    if (!selectedBook) return 'No book selected.'
    return `${selectedBook.title} has ${selectedBook.availableCopies} available copy/copies.`
  }, [selectedBook])

  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) return books

    return books.filter((book) => {
      const haystack = `${book.title} ${book.author} ${book.genre}`.toLowerCase()
      return haystack.includes(normalizedSearch)
    })
  }, [books, searchTerm])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 text-center text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        <div className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 shadow-lg shadow-slate-300/20 dark:bg-slate-900">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500 dark:border-slate-800 dark:border-t-sky-400" />
        </div>
        <p className="mt-6 text-lg font-semibold">Loading library dashboard...</p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Preparing your reservation data with live filters and dark mode.</p>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-red-50 px-4 py-10 text-center text-red-900 dark:bg-red-950 dark:text-red-100">
        <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-white p-8 shadow-lg shadow-red-200/30 dark:border-red-700 dark:bg-red-950/80">
          <h1 className="text-2xl font-semibold">Unable to load reservation data</h1>
          <p className="mt-3 text-sm text-red-600 dark:text-red-300">We could not fetch the mock library records. Refresh the page to try again.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Reload page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-3xl bg-white/90 p-6 shadow-xl shadow-slate-400/10 backdrop-blur dark:bg-slate-900/80 dark:shadow-none sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Library Book Reservation System</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Reserve books with live availability updates</h1>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-400/10 backdrop-blur dark:border-slate-700 dark:bg-slate-950/80">
            <label htmlFor="book-search" className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">Search books</label>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <input
                id="book-search"
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by title, author, or genre"
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200/80 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              />
              <p className="text-sm text-slate-500 dark:text-slate-400">Previous search: {previousSearch ?? 'none'}</p>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-400/5 dark:border-slate-700 dark:bg-slate-950/80">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Users</h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Select a user to preview details and keep the hooks working.</p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleDetails}
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    {showDetails ? 'Hide details' : 'Show details'}
                  </button>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {users.map((user) => (
                    <UserCard key={user.id} user={user} onClick={() => setSelectedUser(user)} />
                  ))}
                </div>
                <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  Selected user: <span className="font-semibold">{selectedUser?.name ?? 'None'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-400/5 dark:border-slate-700 dark:bg-slate-950/80">
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Books</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Searchable library books render dynamically through state.</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                  {filteredBooks.map((book, index) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      variant={index === 0 ? 'compact' : 'default'}
                      onSelect={() => setSelectedBook(book)}
                    />
                  ))}
                </div>
                <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {availabilityMessage}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-400/5 dark:border-slate-700 dark:bg-slate-950/80">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Reservations</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Reservation badges display current status with compact variants for pending items.</p>
              </div>
              <p className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">Responsive grid</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onSelect={() => setSelectedReservation(reservation)}
                  variant={reservation.status === ReservationStatus.Pending ? 'compact' : 'default'}
                />
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Selected reservation: <span className="font-semibold">{selectedReservation ? `#${selectedReservation.id}` : 'None'}</span>
            </div>

            {showDetails && selectedBook && (
              <div className="mt-6 rounded-3xl bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                Selected book details: {selectedBook.title} — {selectedBook.availableCopies} available copies
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default App


