import type { Book, Reservation, User } from './types'
import { ReservationStatus } from './types'

const users: User[] = [
  { id: 1, name: 'Ana Santos', email: 'ana@example.com', role: 'student', isActive: true },
  { id: 2, name: 'Ben Cruz', email: 'ben@example.com', role: 'librarian', isActive: true },
]

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
]

const reservations: Reservation[] = [
  {
    id: 101,
    bookId: 1,
    userId: 1,
    status: ReservationStatus.Pending,
    requestedAt: new Date('2026-07-18T08:30:00'),
  },
]

console.log(users[0].name)
console.log(books[0].title)
console.log(reservations[0].status)
export {}
