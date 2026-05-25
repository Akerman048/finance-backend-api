# Finance Backend API

REST API for a finance dashboard application built with Node.js, Express and PostgreSQL.

## Features

- User registration
- User login
- JWT authentication
- Protected routes
- Transactions CRUD
- User-specific transactions
- Password hashing with bcrypt
- Validation with Zod
- Global error handling

## Tech Stack

- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt
- Zod

## Installation

```bash
npm install
```

## Environment Variables

Create `.env` file:

```env
PORT=8000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

## Run the server

```bash
npm run dev
```

## API Endpoints

### Auth

#### Register

```http
POST /auth/register
```

#### Login

```http
POST /auth/login
```

### Transactions

#### Get all transactions

```http
GET /transactions
```

Requires JWT token.

#### Create transaction

```http
POST /transactions
```

Requires JWT token.

## Project Structure

```txt
src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
├── schemas/
├── db/
```
