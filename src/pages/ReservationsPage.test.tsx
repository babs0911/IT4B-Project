import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchBooks, fetchReservations } from "@/api/client";
import type { ApiBook } from "@/types";
import ReservationsPage from "./ReservationsPage";

vi.mock("@/api/client", () => ({
  createReservation: vi.fn(),
  fetchBooks: vi.fn(),
  fetchReservations: vi.fn(),
}));

const book: ApiBook = {
  id: "book-1",
  title: "The Hobbit",
  author: "J. R. R. Tolkien",
  genre: "Fantasy",
  availableCopies: 1,
  reservedCount: 0,
  summary: "A fantasy adventure.",
  tags: ["fantasy"],
};

describe("ReservationsPage", () => {
  beforeEach(() => {
    vi.mocked(fetchBooks).mockResolvedValue([book]);
    vi.mocked(fetchReservations).mockResolvedValue([]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the schema error and sends no request for an empty selection", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ReservationsPage />
      </QueryClientProvider>,
    );

    await screen.findByRole("option", { name: "The Hobbit — J. R. R. Tolkien" });
    await user.click(screen.getByRole("button", { name: "Reserve book" }));

    expect(await screen.findByText("Select a book to reserve.", { exact: true })).toBeInTheDocument();
    await waitFor(() => expect(fetchSpy).not.toHaveBeenCalled());
  });
});
