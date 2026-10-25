# Library Book Reservation System

A React, TypeScript, and Vite frontend for the Library Book Reservation API. The app loads the book catalog from the backend, supports account registration and login, and lets authenticated users create and view their reservations.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `VITE_API_URL` to the backend API base URL. For local development, use `http://localhost:4000/api`.
3. Start the frontend with `npm run dev`.
4. Build and type-check with `npm run build`.

Run the backend separately from its `itelect4-backend` directory. Configure its environment, then use `npm run dev`; use `npm run seed:books` to insert or update the sample catalog.

## Deploy to Vercel

Deploy this repository as a Vite project from the `gt5-ai` production branch. Set `VITE_API_URL` to the deployed backend URL ending in `/api` (for example, `https://itelect4-backend-umber.vercel.app/api`). The frontend defaults to the deployed API in production and localhost in development. Add the exact frontend origin (scheme and hostname, without a path) to the backend's `CORS_ORIGIN` and redeploy the backend.

## API behavior

- Public catalog reads use `GET /books` and `GET /books/:id`.
- Login and registration use `POST /auth/login` and `POST /auth/register`.
- Reservation reads and writes send the stored JWT as a Bearer token.