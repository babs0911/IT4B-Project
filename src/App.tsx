import { useMemo, useState } from 'react'
import './App.css'
import BookCard from './components/BookCard'
import ReservationCard from './components/ReservationCard'
import UserCard from './components/UserCard'
import type { Book, Reservation, User } from './types'
import { ReservationStatus } from './types'

// Primitive types and interfaces: arrays of User objects are typed with the User interface.
const users: User[] = [
  { id: 1, name: 'Ana Santos', email: 'ana@example.com', role: 'student', isActive: true },
  { id: 2, name: 'Ben Cruz', email: 'ben@example.com', role: 'librarian', isActive: true },
]

// Primitive types and interfaces: books are typed using the Book interface.
const books: Book[] = [
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
]

// Enum usage: the reservation status is assigned from ReservationStatus.
const reservations: Reservation[] = [
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
]

// Type narrowing example: selectedBook is checked before accessing its properties.
function App() {
  // Union type with null: state can hold either a User or null.
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0])
  // Union type with null: state can hold either a Book or null.
  const [selectedBook, setSelectedBook] = useState<Book | null>(books[0])
  // Union type with null: state can hold either a Reservation or null.
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(reservations[0])

  // Generic hook usage with useMemo: the returned value is inferred as a string.
  const availabilityMessage = useMemo(() => {
    if (!selectedBook) return 'No book selected.'
    return `${selectedBook.title} has ${selectedBook.availableCopies} available copy/copies.`
  }, [selectedBook])

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Library Book Reservation System</p>
        <h1>Reserve books with live availability updates</h1>
      </header>

      <section className="section">
        <h2>Users</h2>
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
          {books.map((book) => (
            <BookCard key={book.id} book={book} onSelect={() => setSelectedBook(book)} />
          ))}
        </div>
        <p className="selection">{availabilityMessage}</p>
      </section>

      <section className="section">
        <h2>Reservations</h2>
        <div className="card-grid">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} onSelect={() => setSelectedReservation(reservation)} />
          ))}
        </div>
        <p className="selection">Selected reservation: #{selectedReservation?.id ?? 'None'}</p>
      </section>
    </main>
  )
}

export default App
