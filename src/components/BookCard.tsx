import type { Book } from '../types'

// Props typing: explicit interface for component props.
interface BookCardProps {
  book: Book
  onSelect: () => void
}

// Event handler typing: onSelect is a function that takes no arguments and returns void.
function BookCard({ book, onSelect }: BookCardProps) {
  return (
    <article className="card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Available copies: {book.availableCopies}</p>
      <p>Summary: {book.summary}</p>
      <button type="button" onClick={onSelect}>
        View details
      </button>
    </article>
  )
}

export default BookCard