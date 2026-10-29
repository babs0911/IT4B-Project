import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import BookCard from "./BookCard";
import type { Book } from "../types";

describe("BookCard", () => {
  it("shows the sold-out status when no copies are available", () => {
    const book: Book = {
      id: "book-1",
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      genre: "Fantasy",
      availableCopies: 0,
      reservedCount: 2,
      summary: "A fantasy adventure.",
      tags: ["fantasy"],
    };

    render(<BookCard book={book} onSelect={vi.fn()} />);

    expect(screen.getByText("Sold out", { exact: true })).toBeInTheDocument();
  });
});
