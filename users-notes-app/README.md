# Users & Notes API

A RESTful API built with **Node.js, Express, PostgreSQL, and TypeORM** for managing users and their notes.

## Features

- User registration and login with password hashing and JWT authentication.
- User profile retrieval and updates, user search, and admin-only user management.
- Create, read, search, update, and delete notes.
- Zod request validation and reusable Express middleware.
- Role-based access control and note ownership checks.
- Centralized error handling with `AppError` and `asyncHandler`.

## Tech Stack

Node.js · Express.js · PostgreSQL · TypeORM · JWT · bcrypt · Zod

## Project Structure

```text
auth/          Authentication handlers
controllers/   User and note controllers
database/      Database configuration
middlewares/   Authentication, authorization, validation, and error handling
models/        User and note schemas
routes/        API routes
utils/         AppError and asyncHandler
validation/    Zod validation schemas
app.js         Express application setup
server.js      Server entry point
```

## API Endpoints

Base path: `/api`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a user |
| POST | `/auth/login` | Public | Log in and receive a JWT |
| GET | `/users/me` | Authenticated | Get the current user's profile |
| PATCH | `/users/` | Authenticated | Update the current user's profile |
| GET | `/users/search?name=...` | Authenticated | Search users by username |
| GET | `/users/` | Admin | List all users |
| GET | `/users/:id` | Admin | Get a user and their notes |
| DELETE | `/users/:id` | Admin | Delete a user |
| POST | `/notes/` | Authenticated | Create a note |
| GET | `/notes/` | Authenticated | List notes |
| GET | `/notes/myNotes` | Authenticated | Get the current user's notes |
| GET | `/notes/:userId` | Authenticated | Get notes for a specified user |
| GET | `/notes/search?title=...` | Authenticated | Search notes by title |
| PATCH | `/notes/:id` | Owner or admin | Update a note |
| DELETE | `/notes/:id` | Owner or admin | Delete a note |

Protected endpoints require a JWT in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Run Locally

Install the project dependencies, then start the development server:

```bash
npm install
npm run dev
```

To start without Nodemon:

```bash
npm start
```

The default port is `5000`.
