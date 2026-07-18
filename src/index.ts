// Import interfaces, types, enums and generic helpers from the shared types file
import type {
  User,
  Book,
  Reservation,
  ID,
  StringOrNumber,
  StudentWithCourse,
  UserUpdate,
  BookPreview,
  ApiResponse,
} from "../types/index";
import { ReservationStatus, getFirst, getById } from "../types/index";

// === Primitives ===
// `number`, `string`, and `boolean` appear as field types on the `User` and `Book` interfaces below.
const users: User[] = [
  { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: "student", isActive: true },
  { id: 2, name: "Librarian Linda", email: "linda@library.edu", role: "librarian", isActive: true },
  { id: 3, name: "Maria Santos", email: "maria@example.com", role: "student", isActive: true },
];

const books: Book[] = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    availableCopies: 2,
    reservedCount: 1,
    summary: "A handbook of agile software craftsmanship.",
    tags: ["programming", "best-practices"],
  },
  {
    id: 2,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    genre: "Programming",
    availableCopies: 1,
    reservedCount: 0,
    summary: "Deep dive into JavaScript's core mechanisms.",
    tags: ["javascript", "advanced"],
  },
];

// ===== Interfaces =====
// `User`, `Book`, and `Reservation` are interfaces imported from `types/index.ts` and used as shapes here.

// ===== Type Aliases =====
// `ID` alias (number | string) can be used where flexible ids are needed.
const sampleId: ID = 42;

// ===== UNION & INTERSECTION TYPES =====
// `StringOrNumber` is a union type; `StudentWithCourse` is an intersection combining `User` + course info.
const unionExample: StringOrNumber = "S2026-001";
const studentWithCourse: StudentWithCourse = {
  id: 4,
  name: "Top Student",
  email: "top@student.edu",
  role: "student",
  isActive: true,
  enrolledCourse: { code: "ITELECT4", title: "IT Elective 4", units: 3, semester: "1st" },
  gpa: 1.0,
};

// ===== Special Types: `unknown` + `never` =====
let rawInput: unknown = "maybe a string";
// Type narrowing: check runtime type before using
if (typeof rawInput === "string") {
  const confirmedString: string = rawInput; // narrowed from unknown to string
  void confirmedString;
}
function fail(message: string): never {
  throw new Error(message);
}

const reservations: Reservation[] = [
  {
    id: 101,
    bookId: 1,
    userId: 1,
    status: ReservationStatus.Pending,
    requestedAt: new Date("2026-07-17T05:50:54.322Z"),
  },
  {
    id: 102,
    bookId: 2,
    userId: 3,
    status: ReservationStatus.Pending,
    requestedAt: new Date("2026-07-17T06:10:00.000Z"),
  },
];

console.log("=== LIBRARY BOOK RESERVATION SYSTEM ===\n");

console.log("USERS");
console.log(JSON.stringify(users, null, 2));

console.log("\nBOOKS");
console.log(JSON.stringify(books, null, 2));

console.log("\nRESERVATIONS");
console.log(JSON.stringify(reservations, null, 2));

console.log("\nLIVE AVAILABILITY");
console.log(`Book: ${books[0].title} - Available Copies: ${books[0].availableCopies}`);

console.log("\nRESERVATION STATUS");
for (const r of reservations) {
  // Print the reservation id once, then the status progression.
  console.log(`Reservation ID: #${r.id}`);
  console.log(`Status: ${ReservationStatus[r.status]}`);
  // simulate a progression for each reservation (no repeated ID)
  console.log(`Status: ${ReservationStatus[ReservationStatus.Reserved]}`);
  console.log(`Status: ${ReservationStatus[ReservationStatus.Borrowed]}`);
  console.log(`Status: ${ReservationStatus[ReservationStatus.Returned]}`);
}

// ===== Generics & Utility Types =====
// Use generic helpers from `types/index.ts` to get typed items.
const firstBook = getFirst<Book>(books);
const foundReservation = getById<Reservation>(reservations, 102);

// Utility types example usages (already demonstrated in types):
const updatePayload: UserUpdate = { name: "Juan Updated" };
const preview: BookPreview = { id: books[0].id, title: books[0].title, availableCopies: books[0].availableCopies };
const apiResponse: ApiResponse<Book[]> = { success: true, data: books };

export {};
