# Mini-CRM

A full-stack customer relationship management application for capturing, organizing, and tracking leads from website contact forms.

## Overview

Mini-CRM provides an admin dashboard and REST API for managing incoming leads through a simple workflow: **New → Contacted → Converted**.

## Features

- Admin authentication with JWT and bcrypt password hashing
- Protected dashboard and lead-management routes
- Create, view, update, and delete lead records
- Lead status workflow: new, contacted, and converted
- Search, filtering, sorting, and pagination
- Lead details and notes modals
- Dashboard analytics cards
- Responsive interface, loading states, toast notifications, and delete confirmation

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, React Router, Vite |
| API | Node.js, Express |
| Database / ORM | SQLite, MySQL, PostgreSQL, Sequelize |
| Authentication | JSON Web Tokens, bcryptjs |
| HTTP client | Axios |
| UI feedback | React Toastify |

## Project Structure

```text
Mini-CRM/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── services/
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites

- Node.js and npm
- A supported database: SQLite, MySQL, or PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/dk1206/Mini-CRM.git
cd Mini-CRM
```

### 2. Install dependencies

```bash
npm install
npm --prefix client install
```

### 3. Configure environment variables

Create a local `.env` file using `.env.example` as a reference. Configure the database connection, JWT secret, and admin credentials for your environment.

For SQLite, the configuration uses a local database file. For MySQL or PostgreSQL, provide the corresponding host, port, database name, username, and password.

**Security:** Use a strong, unique JWT secret and non-default admin credentials. Never commit your real `.env` file or production secrets.

### 4. Start the application

```bash
npm run dev
```

The development servers use these default local addresses:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

## API Overview

| Method | Endpoint | Purpose | Access |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | Admin login | Public |
| GET | `/api/leads` | Retrieve leads | Protected |
| POST | `/api/leads` | Submit a lead from a contact form | Public |
| PUT | `/api/leads/:id` | Update a lead | Protected |
| DELETE | `/api/leads/:id` | Delete a lead | Protected |

## Available Scripts

Run these commands from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the frontend and backend in development |
| `npm run server` | Start the backend with Nodemon |
| `npm run client` | Start the Vite frontend |
| `npm run build` | Build the frontend for production |
| `npm start` | Start the backend |

## Production Notes

- Configure production environment variables before deployment.
- Set the frontend API URL as required by your hosting setup.
- Use HTTPS and secure database credentials in production.
- Do not expose admin credentials or secrets in source control.

## Repository

[github.com/dk1206/Mini-CRM](https://github.com/dk1206/Mini-CRM)
