# E-Commerce Backend API

## Overview

This project is a RESTful Backend API for an E-Commerce system developed using Node.js, Express.js, and MongoDB following the MVC (Model-View-Controller) architecture.

The API allows users to manage product categories, products, shopping carts, and orders. It also includes a database seed script, centralized error handling, data validation, and a Postman collection for testing all endpoints.

---

## Features

- Categories CRUD Operations
- Products CRUD Operations
- Product Filtering
- Category Population using Mongoose
- Shopping Cart Management
- Checkout & Order Creation
- MongoDB Data Seeding
- Global Error Handling
- Input Validation
- Postman Collection & Environment

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- express-mongo-sanitize
- express-validator

---

## Project Structure

```
project-root/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
│
├── app.js
├── server.js
├── seed.js
├── package.json
├── .env.example
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/jojohossam201086-cmyk/E-Commerce-Backend.git
```

Move to the project folder:

```bash
cd E-Commerce-Backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

---

## Running the Project

Start the server:

```bash
npm start
```

Run in development mode:

```bash
npm run dev
```

Seed the database with sample data:

```bash
npm run seed
```

---

## API Endpoints

### Categories

| Method | Endpoint |
|---------|----------|
| GET | /api/categories |
| GET | /api/categories/:id |
| POST | /api/categories |
| PATCH | /api/categories/:id |
| DELETE | /api/categories/:id |

---

### Products

| Method | Endpoint |
|---------|----------|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PATCH | /api/products/:id |
| DELETE | /api/products/:id |

---

### Cart

| Method | Endpoint |
|---------|----------|
| POST | /api/cart |
| GET | /api/cart/:user |
| DELETE | /api/cart/:user/:productId |
| DELETE | /api/cart/:user |

---

### Orders

| Method | Endpoint |
|---------|----------|
| POST | /api/orders/checkout |

---

## Testing

All API endpoints have been tested using Postman.

The project includes:

- Postman Collection
- Postman Environment

These files can be imported directly into Postman to test the API.

---

## Repository

GitHub Repository:

https://github.com/jojohossam201086-cmyk/E-Commerce-Backend

---

## Notes

- The project follows the MVC architecture.
- MongoDB is used as the database.
- Mongoose is used for data modeling.
- Centralized error handling is implemented.
- Environment variables are managed using dotenv.
- Sample data can be generated using the seed script.