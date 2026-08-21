import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../types/index";
import BookCard from "../components/BookCard";
import usePrevious from "../Hooks/UsePrevious";
import { allBooks } from "../Data/mockData";

function BookPage() {
	const [books, setBooks] = useState<Book[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const searchInputRef = useRef<HTMLInputElement>(null);
	const previousSearch = usePrevious(searchTerm);

	useEffect(() => {
		setTimeout(() => {
			setBooks(allBooks);
			setIsLoading(false);
		}, 500);
	}, []);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
		setSearchTerm(e.target.value);

	const filteredBooks = books.filter((b) =>
		b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		String(b.id).includes(searchTerm)
	);

	if (isLoading) {
		return <div className="animate-pulse p-6">Loading books...</div>;
	}
	if (isError) {
		return (
			<div className="rounded-lg bg-red-50 p-4 text-red-700">Could not load books.</div>
		);
	}

	return (
		<div>
			<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Books</h2>
			<button onClick={() => setIsError(true)} className="mb-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700">
				Simulate Error
			</button>
			<input ref={searchInputRef} value={searchTerm} onChange={handleSearchChange} placeholder="Search by title, author, or genre" className="w-full rounded border border-gray-300 p-2" />
			{previousSearch !== undefined && previousSearch !== searchTerm && (
				<p className="mt-1 text-sm text-gray-500">Previous search: "{previousSearch}"</p>
			)}

			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filteredBooks.map((b) => (
					<Link key={b.id} to={`/books/${b.id}`}>
						<BookCard book={b} onSelect={() => {}} />
					</Link>
				))}
			</div>
		</div>
	);
}

export default BookPage;