# ShopSphere — 3-Tier E-commerce Application

A full-stack e-commerce starter built with React (Vite), Express, Prisma and PostgreSQL.
It intentionally contains **no DevOps tooling or deployment automation**.

## Requirements
- Node.js 20+
- PostgreSQL 15+
- npm

## 1. Database
Create a PostgreSQL database:
```sql
CREATE DATABASE shopsphere;
```

## 2. Backend
```bash
cd backend
cp .env.example .env
# Edit DATABASE_URL and JWT_SECRET in .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```
Backend runs at http://localhost:5000. Health check: http://localhost:5000/api/health

Seeded admin:
- Email: admin@shopsphere.local
- Password: Admin123!

Seeded customer:
- Email: customer@shopsphere.local
- Password: Customer123!

Change these credentials before using the app outside a local development environment.

## 3. Frontend
In another terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Open http://localhost:5173

## Included functionality
- Customer registration/login with JWT and bcrypt password hashing
- Product listing, search, category filtering and product detail
- Persistent cart (database-backed for logged-in users)
- Checkout with shipping address and cash-on-delivery / demo payment selection
- Order history and order details
- Admin dashboard, product CRUD, order status updates
- PostgreSQL relational schema, Prisma migrations and seed data

## Payment note
The checkout includes COD and a clearly-labelled demo payment option. It does not collect or process real card details. Add a payment provider's official server-side integration before accepting real payments.

## API overview
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/products`, `GET /api/products/:id`
- `GET /api/categories`
- `GET /api/cart`, `POST /api/cart/items`, `PATCH /api/cart/items/:id`, `DELETE /api/cart/items/:id`
- `POST /api/orders`, `GET /api/orders/my`, `GET /api/orders/:id`
- Admin: `GET /api/admin/stats`, `POST/PATCH/DELETE /api/admin/products...`, `GET /api/admin/orders`, `PATCH /api/admin/orders/:id/status`

## Troubleshooting
- `P1001`: PostgreSQL is not running or DATABASE_URL is incorrect.
- `P2002`: an email or unique field already exists.
- CORS: keep the frontend URL in backend `CLIENT_URL`.
- If schema changes, run `npx prisma migrate dev`.
