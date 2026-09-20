# Frontend Assessment

A full-stack assessment project consisting of a **Next.js 14** frontend and an **Express.js** backend.

## Project Structure

```
frontend-assessment/
├── frontend/   # Next.js 14 app (TypeScript)
├── backend/    # Express.js API server
└── REVIEW.md   # Code review findings
```

## Getting Started

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

The API server runs on **http://localhost:4000**.

### 2. Frontend

```bash
cd frontend
npm install
```

Copy the environment file and configure it:

```bash
cp .env.example .env.local
```

`.env.local`:
```
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:4000
```

Then start the dev server:

```bash
npm run dev
```

The app runs on **http://localhost:3000**.

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | Next.js 14, React 18, TypeScript  |
| Backend  | Node.js, Express 4                |

## Scripts

### Frontend (`/frontend`)

| Command         | Description               |
|-----------------|---------------------------|
| `npm run dev`   | Start development server  |
| `npm run build` | Build for production      |
| `npm start`     | Start production server   |

### Backend (`/backend`)

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start with file-watch (hot reload) |
| `npm start`     | Start without watch                |
