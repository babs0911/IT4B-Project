import type { Book, Reservation, User } from '../types'
import { ReservationStatus } from '../types'

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

export const allUsers = mockUsers;
export const student = mockUsers[0];
export const allBooks = mockBooks;
export const allReservations = mockReservations;

export const allSubmissions = [
  { id: 1, repoUrl: 'https://github.com/ana/submission', score: 92, courseCode: 'IT4B' },
  { id: 2, repoUrl: 'https://github.com/ben/submission', score: null, courseCode: 'IT4B' },
];