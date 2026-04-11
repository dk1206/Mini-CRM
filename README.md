# Mini CRM (React + Express + SQL)

A production-style mini CRM to manage incoming leads from website contact forms.

## Features

- JWT admin login with bcrypt password hashing
- Protected admin dashboard routes
- Full lead management CRUD API
- Lead status workflow: `new` -> `contacted` -> `converted`
- Search, filter, sorting, pagination
- Lead details modal and notes modal
- Dashboard analytics cards
- Glassmorphism UI with responsive layout and transitions
- Toast notifications, loading states, delete confirmation

## Project Structure

```text
mini-crm/
├── client/
│   ├── src/components/
│   ├── src/pages/
│   ├── src/context/
│   ├── src/services/
│   ├── src/App.jsx
│   └── src/main.jsx
├── server/
│   ├── config/db.js
│   ├── middleware/authMiddleware.js
│   ├── models/Admin.js
│   ├── models/Lead.js
│   ├── routes/authRoutes.js
│   ├── routes/leadRoutes.js
│   └── server.js
├── .env
├── .env.example
└── package.json
```

## Setup

1. Install dependencies:

```bash
npm install
npm --prefix client install
```

2. Configure your database in `.env`:

### SQLite (default, file-based)
```env
DB_TYPE=sqlite
SQLITE_STORAGE=./server/data/mini-crm.sqlite
```

### PostgreSQL
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mini_crm
DB_USER=postgres
DB_PASSWORD=your_password
```

### MySQL
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mini_crm
DB_USER=root
DB_PASSWORD=your_password
```

3. Update `JWT_SECRET` and admin credentials in `.env` if needed.

4. Start both frontend and backend:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Endpoints

### Auth

- `POST /api/auth/login`

### Leads

- `GET /api/leads` (protected)
- `POST /api/leads` (public, for website contact forms)
- `PUT /api/leads/:id` (protected)
- `DELETE /api/leads/:id` (protected)

## Default Admin

On first startup, a default admin is seeded if it does not already exist.

- Email: `admin@mini-crm.com`
- Password: `admin12345`

Override defaults using `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`.

## Notes

- Vite proxy is configured so frontend calls `/api/*` directly in development.
- For production deployment, set `VITE_API_URL` in the frontend build environment if needed.
- The backend uses Sequelize with SQLite (SQL). The database file is auto-created at `server/data/mini-crm.sqlite`.
