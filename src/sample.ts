import type { Book, User } from './types'

type UserWithScore = User & { score: number }

const user: UserWithScore = {
  id: 1,
  name: 'Juan dela Cruz',
  email: 'juan@example.com',
  role: 'student',
  isActive: true,
  score: 95.5,
}

const book: Book = {
  id: 1,
  title: 'Clean Code',
  author: 'Robert C. Martin',
  genre: 'Programming',
  availableCopies: 2,
  reservedCount: 1,
  summary: 'A practical guide to writing readable software.',
  tags: ['programming', 'best-practices'],
}

console.log(user.name, book.title)
export {}
