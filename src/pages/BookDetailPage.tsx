import { useParams, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { allBooks } from "../Data/mockData";

function BookDetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const book = allBooks.find((b) => b.id === Number(id));

	if (book === undefined) {
		return (
			<div className="rounded-lg bg-red-50 p-4 text-red-700">
				No book found with id "{id}".
			</div>
		);
	}

	return (
		<div>
			<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{book.title}</h2>
			<div className="max-w-sm">
				<BookCard book={book} onSelect={() => {}} />
			</div>
			<button onClick={() => navigate("/books")}
				className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700">
				Back to Books
			</button>
		</div>
	);
}

export default BookDetailPage;

