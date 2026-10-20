import type { Book, Reservation, User } from './types'
import { ReservationStatus } from './types'

const users: User[] = [
  { id: 'ana', name: 'Ana Santos', email: 'ana@example.com', role: 'student', isActive: true },
  { id: 'ben', name: 'Ben Cruz', email: 'ben@example.com', role: 'librarian', isActive: true },
]

const books: Book[] = [
  {
    id: 'clean-code',
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
    id: 'reservation-101',
    bookId: 'clean-code',
    userId: 'ana',
    status: ReservationStatus.Pending,
    requestedAt: new Date('2026-07-18T08:30:00'),
  },
]

console.log(users[0].name)
console.log(books[0].title)
console.log(reservations[0].status)
export {}
