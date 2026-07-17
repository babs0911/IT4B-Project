# Library Book Reservation System

This project is a TypeScript example for a simple library book reservation workflow. It models users, books, reservations, and live availability updates while demonstrating interfaces, generics, utility types, enums, and type-safe data handling.

## Included concepts

- User, course, and submission interfaces remain available in the shared types file.
- Book and Reservation interfaces model the library domain.
- ApiResponse<T> provides a reusable API response shape.
- Generic helpers such as getFirst and getById support reusable lookups.
- Utility types such as Partial, Pick, Omit, Record, and ReturnType are used in the sample app.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the sample app:
   ```bash
   npx ts-node src/index.ts
   ```
3. Verify the TypeScript build:
   ```bash
   npx tsc --noEmit
   ```
