import useAuthStore from "../Store/authStore";
import type { AiReply, ApiBook, ApiReservation, NewReservationRequest, User } from "../types/index";

const defaultApiUrl = import.meta.env.PROD
	? "https://itelect4-backend-umber.vercel.app/api"
	: "http://localhost:4000/api";

export const API_URL = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/+$/, "");

interface AuthResponse {
	token: string;
	user: Pick<User, "id" | "name" | "email" | "role" | "isActive">;
}

async function request<T>(path: string, init: RequestInit = {}, authenticated = false): Promise<T> {
	const headers = new Headers(init.headers);
	if (init.body !== undefined && !headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}
	if (authenticated) {
		const token = useAuthStore.getState().token;
		if (!token) throw new Error("Please log in to continue.");
		headers.set("Authorization", `Bearer ${token}`);
	}

	const response = await fetch(`${API_URL}${path}`, { ...init, headers });
	if (!response.ok) {
		const responseText = await response.text();
		let message = responseText || `Request failed: ${response.status}`;
		try {
			const body: unknown = JSON.parse(responseText);
			if (typeof body === "object" && body !== null && "message" in body && typeof body.message === "string") {
				message = body.message;
			}
		} catch {
			// Preserve the response text when the server does not return JSON.
		}
		throw new Error(message);
	}
	return response.json() as Promise<T>;
}

export function fetchBooks(): Promise<ApiBook[]> {
	return request<ApiBook[]>("/books");
}

export async function fetchBookById(id: string): Promise<ApiBook> {
	return request<ApiBook>(`/books/${encodeURIComponent(id)}`);
}

export function fetchReservations(): Promise<ApiReservation[]> {
	return request<ApiReservation[]>("/reservations", {}, true);
}

export function createReservation(reservation: NewReservationRequest): Promise<ApiReservation> {
	return request<ApiReservation>("/reservations", {
		method: "POST",
		body: JSON.stringify(reservation),
	}, true);
}

export function loginUser(email: string, password: string): Promise<AuthResponse> {
	return request<AuthResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify({ email, password }),
	});
}

export function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
	return request<AuthResponse>("/auth/register", {
		method: "POST",
		body: JSON.stringify({ name, email, password }),
	});
}

export function askAi(prompt: string): Promise<AiReply> {
	return request<AiReply>("/ai", {
		method: "POST",
		body: JSON.stringify({ prompt }),
	}, true);
}