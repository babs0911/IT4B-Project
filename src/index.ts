import type {
  ApiResponse,
  AvailabilityMap,
  Book,
  BookPreview,
  Course,
  NewReservation,
  PublicBook,
  Reservation,
  Submission,
  User,
  UserUpdate,
} from "../types/index";
import {
  ReservationStatus,
  UserRole,
  createDemoReservation,
  getById,
  getFirst,
} from "../types/index";

const student: User = {
  id: 1,
  name: "Ana Cruz",
  email: "ana@example.com",
  role: UserRole.Student,
  isActive: true,
};

const librarian: User = {
  id: 2,
  name: "Mina Santos",
  email: "mina@example.com",
  role: UserRole.Librarian,
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "Library Systems",
  units: 3,
  semester: "2026-2027",
};

const submission: Submission = {
  id: 1,
  studentId: student.id,
  courseCode: course.code,
  repoUrl: "https://github.com/example/library-reservation",
  submittedAt: new Date(),
  score: 100,
};

const books: Book[] = [
  {
    id: 1,
    title: "The Art of Design",
    author: "Mina Santos",
    genre: "Design",
    availableCopies: 3,
    reservedCount: 1,
    summary: "A practical guide to modern design systems.",
    tags: ["design", "creative"],
  },
  {
    id: 2,
    title: "Algorithms in Practice",
    author: "Rico Palma",
    genre: "Technology",
    availableCopies: 1,
    reservedCount: 2,
    summary: "A friendly walkthrough of everyday algorithms.",
    tags: ["coding", "algorithms"],
  },
];

const reservations: Reservation[] = [
  {
    id: 10,
    bookId: 1,
    userId: student.id,
    status: ReservationStatus.Pending,
    requestedAt: new Date("2026-07-15"),
  },
  {
    id: 11,
    bookId: 2,
    userId: librarian.id,
    status: ReservationStatus.Reserved,
    requestedAt: new Date("2026-07-16"),
    reservedUntil: new Date("2026-07-23"),
  },
];

const availabilityMap: AvailabilityMap = {
  1: books[0].availableCopies,
  2: books[1].availableCopies,
};

const updatePayload: UserUpdate = { name: "Ana D. Cruz" };
const bookPreview: BookPreview = {
  id: books[0].id,
  title: books[0].title,
  availableCopies: books[0].availableCopies,
};
const publicBook: PublicBook = {
  id: books[1].id,
  title: books[1].title,
  author: books[1].author,
  genre: books[1].genre,
  availableCopies: books[1].availableCopies,
  reservedCount: books[1].reservedCount,
};

const bookResponse: ApiResponse<Book[]> = {
  success: true,
  data: books,
  message: "Library catalog loaded successfully.",
};

const reservationResponse: ApiResponse<Reservation> = {
  success: true,
  data: reservations[0],
  message: "Your reservation is pending approval.",
};

const firstBook = getFirst(books);
const foundBook = getById(books, 2);
const demoReservation: NewReservation = createDemoReservation(1, 2);

function describeReservation(reservation: Reservation): string {
  switch (reservation.status) {
    case ReservationStatus.Pending:
      return "Awaiting librarian approval";
    case ReservationStatus.Reserved:
      return "Ready for pickup";
    case ReservationStatus.Borrowed:
      return "Currently checked out";
    default:
      return "Returned to the shelf";
  }
}

console.log(`Welcome, ${student.name}!`);
console.log(`Course: ${course.title}`);
console.log(`Submission status: ${submission.score ?? 0}%`);
console.log(`First book: ${firstBook?.title ?? "none"}`);
console.log(`Selected book: ${foundBook?.title ?? "none"}`);
console.log(`Live availability for ${books[0].title}: ${availabilityMap[1]} copies`);
console.log(`Book preview: ${bookPreview.title} (${bookPreview.availableCopies} available)`);
console.log(`Public book: ${publicBook.title}`);
console.log(`Reservation update: ${describeReservation(reservations[1])}`);
console.log(`API response: ${bookResponse.message}`);
console.log(`Reservation response: ${reservationResponse.message}`);
console.log(`Demo reservation: ${demoReservation.bookId} / ${demoReservation.userId}`);
console.log(`User update payload: ${updatePayload.name}`);
