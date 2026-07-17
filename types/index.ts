// ===== INTERFACES =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "librarian" | "admin";
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  availableCopies: number;
  reservedCount: number;
  summary: string;
  tags: string[];
}

export interface Reservation {
  id: number;
  bookId: number;
  userId: number;
  status: ReservationStatus;
  requestedAt: Date;
  reservedUntil?: Date;
  borrowedAt?: Date;
  returnedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type UserUpdate = Partial<User>;
export type BookPreview = Pick<Book, "id" | "title" | "availableCopies">;
export type PublicBook = Omit<Book, "summary" | "tags">;
export type AvailabilityMap = Record<number, number>;
export type RoleCount = Record<"student" | "librarian" | "admin", number>;

// ===== ENUMS =====
export enum SubmissionStatus {
  Pending,
  Graded,
  Late,
}

export enum ReservationStatus {
  Pending,
  Reserved,
  Borrowed,
  Returned,
}

export const enum UserRole {
  Student = "student",
  Librarian = "librarian",
  Admin = "admin",
}

// ===== TYPE ALIASES =====
export type ID = number | string;
export type Coordinate = {
  x: number;
  y: number;
};
export type Formatter = (value: number) => string;

// ===== UNION / INTERSECTION TYPES =====
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive";
export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa: number;
};

// ===== GENERIC FUNCTIONS =====
export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

export function createDemoReservation(bookId: number, userId: number) {
  return {
    id: 1,
    bookId,
    userId,
    status: ReservationStatus.Pending,
    requestedAt: new Date(),
  };
}

export type NewReservation = ReturnType<typeof createDemoReservation>;
