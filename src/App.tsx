import React, { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import BookCard from './components/BookCard'
import ReservationCard from './components/ReservationCard'
import UserCard from './components/UserCard'
import usePrevious from './Hooks/UsePrevious.ts'
import useToggle from './Hooks/UseToggle.ts'
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
    title: 'You Don\'t Know JS',
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
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [showDetails, toggleDetails] = useToggle(false)
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
    }, 500)

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
    return <p className="selection">Loading library data...</p>
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Library Book Reservation System</p>
        <h1>Reserve books with live availability updates</h1>
      </header>

      <section className="section">
        <label htmlFor="book-search" className="selection">
          Search books
        </label>
        <input
          id="book-search"
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title, author, or genre"
        />
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="selection">Previous search: {previousSearch}</p>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Users</h2>
          <button type="button" onClick={toggleDetails}>
            {showDetails ? 'Hide' : 'Show'} details
          </button>
        </div>
        <div className="card-grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onClick={() => setSelectedUser(user)} />
          ))}
        </div>
        <p className="selection">Selected user: {selectedUser?.name ?? 'None'}</p>
      </section>

      <section className="section">
        <h2>Books</h2>
        <div className="card-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onSelect={() => setSelectedBook(book)} />
          ))}
        </div>
        <p className="selection">{availabilityMessage}</p>
      </section>

      <section className="section">
        <h2>Reservations</h2>
        <div className="card-grid">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onSelect={() => setSelectedReservation(reservation)}
            />
          ))}
        </div>
        <p className="selection">Selected reservation: #{selectedReservation?.id ?? 'None'}</p>
        {showDetails && selectedBook && (
          <p className="selection">
            Selected book details: {selectedBook.title} — {selectedBook.availableCopies} available
          </p>
        )}
      </section>
    </main>
  )
}

export default App

