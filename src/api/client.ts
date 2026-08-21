import type { ApiBook, ApiReservation, NewReservationRequest } from "../types/index";
export const API_URL = "http://localhost:3001";

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

export function createReservation(reservation: NewReservationRequest): Promise<ApiReservation> {
	return request<ApiReservation>("/reservations", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(reservation),
	});
}
