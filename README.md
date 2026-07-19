# Library Book Reservation System

A Vite + React + TypeScript app for a simple library-book reservation demo. The project uses typed interfaces and reusable components to display mock users, books, and reservations.

## Overview

This project was built as a React + TypeScript assignment to demonstrate:

- A Vite React TypeScript setup
- Shared TypeScript interfaces in the src/types folder
- Reusable components in the src/components folder
- Typed props and event handlers
- Mock data rendered inside App.tsx

## Features

- Displays mock library users
- Displays mock books with availability details
- Displays mock reservations with status information
- Includes three reusable components:
  - UserCard
  - BookCard
  - ReservationCard
- Uses explicit props interfaces for each component
- Includes typed event handlers such as onClick and onSelect

## Project Structure

```text
IT4B-Project/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── types/
│   │   └── index.ts
│   └── components/
│       ├── UserCard.tsx
│       ├── BookCard.tsx
│       └── ReservationCard.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## TypeScript Highlights

- Interfaces for User, Book, Reservation, and ApiResponse
- Enum for reservation status values
- Type aliases such as ID, StringOrNumber, and Formatter
- Utility types such as Partial, Pick, Omit, and ReturnType
- Generic functions for reusable lookups
- Union types and null-safe state handling in React

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Verify the build

```bash
npm run build
```

The project should build successfully with no TypeScript errors.

## Main Files

### src/App.tsx

Renders the mock data and displays all three components.

### src/components/

Contains the reusable React components for the app.

### src/types/index.ts

Contains the shared TypeScript type definitions and enums used throughout the app.