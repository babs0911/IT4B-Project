import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import type { ApiBook } from "../types/index";
import BookCard from "../components/BookCard";
import { fetchBookById } from "../api/client";

function BookDetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { data: book, isPending, isError, error } = useQuery<ApiBook>({
		queryKey: ["books", id],
		queryFn: () => fetchBookById(id!),
		enabled: id !== undefined,
	});
	if (isPending) return <div className="animate-pulse p-6">Loading book...</div>;

	if (isError || book === undefined) {
		return (
			<div className="rounded-lg bg-red-50 p-4 text-red-700">
				{error?.message ?? `No book found with id "${id}".`}
			</div>
		);
	}

	return (
		<div>
			<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{book.title}</h2>
			<div className="max-w-sm">
				<BookCard book={{ ...book, id: Number(book.id) }} onSelect={() => {}} />
			</div>
			<button onClick={() => navigate("/books")}
				className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700">
				Back to Books
			</button>
		</div>
	);
}

export default BookDetailPage;
