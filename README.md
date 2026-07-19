# Library Book Reservation System

A simple TypeScript project that demonstrates a library book reservation workflow. It manages users, books, reservations, book availability, and reservation status updates while applying important TypeScript concepts.

## Features

* Displays registered library users
* Displays available books and book information
* Tracks book reservations
* Shows the live number of available book copies
* Demonstrates the reservation status lifecycle
* Uses reusable generic functions for retrieving data
* Uses type-safe interfaces, aliases, enums, and utility types

## Reservation Status Flow

Each reservation follows this status progression:

Pending → Reserved → Borrowed → Returned  

The `ReservationStatus` enum is used to ensure that only valid reservation statuses are assigned.

## TypeScript Concepts Demonstrated

### Interfaces

The project uses interfaces to define the structure of:

* `User`
* `Book`
* `Reservation`
* `ApiResponse<T>`

### Type Aliases

The shared types file includes aliases such as:

* `ID`
* `Coordinate`
* `Formatter`
* `StringOrNumber`
* `Status`

### Enums

The project includes the following enums:

* `ReservationStatus`
* `UserRole`

### Generics

The reusable `ApiResponse<T>` interface allows different data types to be returned in a consistent response structure:

```typescript
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

The project also includes generic helper functions:

```typescript
getFirst<T>()
getById<T>()
```

These functions can retrieve typed items from arrays without repeating the same lookup logic.

### Utility Types

The following TypeScript utility types are demonstrated:

* `Partial<User>` through `UserUpdate`
* `Pick<Book>` through `BookPreview`
* `Omit<Book>` through `PublicBook`
* `Record` through `AvailabilityMap` and `RoleCount`
* `ReturnType` through `NewReservation`

### Special Types

The project demonstrates the use of:

* `unknown` with type narrowing
* `never` for functions that always throw an error

## Project Structure


project-folder/
├── src/
│   └── index.ts
├── types/
│   └── index.ts
├── README.md
├── package.json
└── tsconfig.json


## Run Locally

### 1. Install dependencies

npm install

### 2. Run the sample application

npx ts-node src/index.ts

### 3. Verify the TypeScript build

npx tsc --noEmit

The command should complete without TypeScript errors.

## Main Files

### `src/index.ts`

Contains the sample application data and demonstrates:

* Users, books, and reservations
* Live book availability
* Reservation status progression
* Generic helper functions
* Utility type usage
* Union and intersection types
* `unknown` and `never` types

### `types/index.ts`

Contains the shared TypeScript definitions, including:

* Interfaces
* Type aliases
* Enums
* Generic functions
* Utility types
* Generic API response structure