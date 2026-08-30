import type { ApiBook, ApiReservation, NewReservationRequest } from "../types/index";
export const API_URL = "http://localhost:3005";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(`${API_URL}${path}`, init);
	if (!response.ok) throw new Error(`Request failed: ${response.status}`);
	return response.json() as Promise<T>;
}

export function fetchBooks(): Promise<ApiBook[]> {
	return request<ApiBook[]>("/books");
}

export async function fetchBookById(id: string): Promise<ApiBook> {
	return request<ApiBook>(`/books/${encodeURIComponent(id)}`);
}

export function fetchReservations(): Promise<ApiReservation[]> {
	return request<ApiReservation[]>("/reservations");
}

export async function createReservation(reservation: NewReservationRequest): Promise<ApiReservation> {
	const reservations = await fetchReservations();
	const numericIds = reservations
		.map((item) => Number.parseInt(item.id, 10))
		.filter((value) => Number.isFinite(value));
	const nextId = numericIds.length > 0 ? String(Math.max(...numericIds) + 1) : "101";

	return request<ApiReservation>("/reservations", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ...reservation, id: nextId }),
	});
}
