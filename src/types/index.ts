// ===== INTERFACES =====
// Interface: defines the shape of a User entity used across the app.
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "librarian" | "admin";
  isActive: boolean;
}

// Interface: defines the shape of a Book entity.
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  genre: string;
  availableCopies: number;
  reservedCount: number;
  summary: string;
  tags: string[];
}

// Interface: defines the shape of a Reservation entity.
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

// Generic interface: T allows this response wrapper to work with any payload type.
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
// Utility type: Partial makes all properties of User optional.
export type UserUpdate = Partial<User>;
// Utility type: Pick keeps only the selected properties from Book.
export type BookPreview = Pick<Book, "id" | "title" | "availableCopies">;
// Utility type: Omit removes the specified properties from Book.
export type PublicBook = Omit<Book, "summary" | "tags">;
// Utility type: Record creates a map of numeric IDs to numbers.
export type AvailabilityMap = Record<number, number>;
export type RoleCount = Record<"student" | "librarian" | "admin", number>;

// ===== ENUMS =====
// Enum: models the reservation lifecycle states.
export enum ReservationStatus {
  Pending,
  Reserved,
  Borrowed,
  Returned,
}

// Const enum: stores string values for user role labels.
export const enum UserRole {
  Student = "student",
  Librarian = "librarian",
  Admin = "admin",
}

// ===== TYPE ALIASES =====
// Type alias: ID can be either a number or a string.
export type ID = number | string;
export type Coordinate = {
  x: number;
  y: number;
};
// Type alias: Formatter describes a function signature.
export type Formatter = (value: number) => string;

// ===== UNION / INTERSECTION TYPES =====
// Union type: StringOrNumber accepts either a string or a number.
export type StringOrNumber = string | number;
// Union type: Status is a literal union of allowed values.
export type Status = "pending" | "active" | "inactive";

// ===== GENERIC FUNCTIONS =====
// Generic function: T lets the function return the same type as the array items.
export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Generic constraint: T must have an id property.
export function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

// Function returning a typed demo reservation using the enum.
export function createDemoReservation(bookId: number, userId: number) {
  return {
    id: 1,
    bookId,
    userId,
    status: ReservationStatus.Pending,
    requestedAt: new Date(),
  };
}

// Utility type: ReturnType captures the return type of createDemoReservation.
export type NewReservation = ReturnType<typeof createDemoReservation>;
