import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { ApiBook } from "../types/index";
import BookCard from "../components/BookCard";
import useUiStore from "../Store/uiStore";
import { fetchBooks } from "../api/client";

function BookPage() {
	const { data, isPending, isError, error } = useQuery<ApiBook[]>({ queryKey: ["books"], queryFn: fetchBooks });
	const searchTerm = useUiStore((state) => state.bookSearchTerm);
	const setSearchTerm = useUiStore((state) => state.setBookSearchTerm);

	if (isPending) return <div className="animate-pulse p-6">Loading books...</div>;
	if (isError) return <div className="rounded-lg bg-red-50 p-4 text-red-700">{error.message}</div>;
	const filteredBooks = data.filter((b) =>
		b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
		b.genre.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Books</h2>
			<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by title, author, or genre" className="w-full rounded border border-gray-300 p-2" />

			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filteredBooks.map((b) => (
					<Link key={b.id} to={`/books/${b.id}`}>
						<BookCard book={{ ...b, id: Number(b.id) }} onSelect={() => {}} />
					</Link>
				))}
			</div>
		</div>
	);
}

export default BookPage;