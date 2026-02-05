# Multi-Vendor E-Commerce Platform

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=next.js)
![License](https://img.shields.io/badge/License-MIT-green)

This project is a complete multi-vendor e-commerce platform where multiple sellers (vendors) can sell their products on a single platform. Customers can browse products, add them to their cart, and place orders, while a Super Admin manages and oversees the entire system. Vendors are responsible for managing their own products and orders, and customers enjoy a smooth shopping experience with cart and checkout functionality.

The system is built using **Node.js** and **Express** for the backend, with **Prisma ORM** managing a **PostgreSQL** database (compatible with NeonDB or Supabase). Authentication and role-based access control are implemented using **JWT**, ensuring secure access for **Super Admin**, **Vendor**, and **Customer** roles. The backend follows a modular and scalable architecture, exposing REST APIs that are consumed by a **Next.js** frontend.

---
Mind Map Link \
[https://whimsical.com/multi-vendor-ecommerce-app-99Z3tRaESj8TANCKrcCBLc](https://whimsical.com/multi-vendor-ecommerce-app-99Z3tRaESj8TANCKrcCBLc)


# Backend

![API](https://img.shields.io/badge/API-REST-success)
![Architecture](https://img.shields.io/badge/Architecture-Modular-blueviolet)

Backend service for a **Multi-Vendor E-Commerce Platform** supporting **Super Admin**, **Vendor**, and **Customer** roles.  
Built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**, following a modular and scalable architecture.

## Features

### User Roles

- **Super Admin**
  - Manage vendors
  - Manage categories & products
  - Platform-level controls
- **Vendor**
  - Manage own products
  - View and process orders
  - Vendor-specific dashboards
- **Customer**
  - Browse products
  - Add to cart
  - Place orders
  - Manage profile

---

### Core Modules

- Authentication & Authorization (JWT-based)
- Product Management
- Cart Management
- Order Management
- Payment Handling
- Vendor Management
- Admin Controls

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Database:** PostgreSQL  
  (NeonDB / Supabase compatible)
- **Authentication:** JWT (JSON Web Tokens)
- **Frontend (separate):** Next.js
- **Package Manager:** npm

---

## Backend Folder Structure

```
backend
├── prisma
│   └── schema.prisma     # Prisma DB schema
├── src
│   ├── config            # Environment & app configuration
│   ├── constants         # Application constants
│   ├── middlewares       # Express middlewares (auth, error handling, etc.)
│   ├── modules           # Feature-based modules
│   │   ├── admin         # Super admin logic
│   │   ├── auth          # Authentication & authorization
│   │   ├── cart          # Cart operations
│   │   ├── customer      # Customer-related logic
│   │   ├── order         # Order processing
│   │   ├── payment       # Payment handling
│   │   ├── product       # Product management
│   │   └── vendor        # Vendor management
│   ├── routes            # API routes
│   └── utils             # Helper utilities
├── .gitignore
├── package.json
└── package-lock.json
```

---

## Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes via middleware
- Token validation & refresh strategy

---

## API Architecture

- **Modular & Scalable**
- Each module contains:
  - Controller
  - Service
  - Route definitions
- Centralized error handling
- Reusable middleware and utilities

---

## Database

- **PostgreSQL** as the primary database
- Managed via **Prisma ORM**
- Supports:
  - NeonDB
  - Supabase PostgreSQL
- Schema defined in `prisma/schema.prisma`

---

## Environment Variables

Create a `.env` or rename sample.env file in the `backend` directory:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Installation & Setup

- Clone the repo and Navigate to backend directory

```
git clone https://github.com/techux/Multi-Vendor-Ecommerce.git
cd backend
```

- Install the dependencies

```
npm install
```

- Generate Prisma client

```
npx prisma generate
```

- Run database migrations

```
npx prisma migrate dev
```

- Start development server

```
npm run dev
```

---

## Scripts

```
npm run dev               # Run the server in development mode
npm run start             # Start the server in production mode
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run Prisma database migrations
npm run prisma:studio     # Open Prisma Studio (DB GUI)
```

## Future Enhancements

- Admin analytics dashboard
- Product reviews & ratings
- Advanced search & filtering
- Order tracking & notifications
- Multi-payment gateway support
- Redis caching


## TODO
- Complete authentication routes

## License

This project is licensed under the **MIT License**




