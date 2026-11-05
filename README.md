# RideX

RideX is a ride-booking web application for Indian cities. It brings bike taxis, auto rickshaws, and cabs into one responsive interface, with customer, captain, and admin experiences.

The project is designed for local development and demonstration. It includes a SQLite database by default and demo-mode integrations; configure and review all services before using it in production.

## Features

- **Ride booking:** Search pickup and destination locations, choose from four ride categories, review an upfront fare estimate, and follow a ride's status.
- **Maps and locations:** Leaflet maps with OpenStreetMap tiles, location search, and route estimates from OSRM.
- **Ride lifecycle:** Customer ride history, captain ride management, ride OTPs, and real-time updates over Socket.IO.
- **Customer tools:** Saved addresses, offers and coupons, profile settings, notifications, and a safety center.
- **Operations tools:** Captain and admin dashboards for demo workflows, ride operations, fares, promotions, and support.
- **Themes and accessibility:** Seven color themes, including the refreshed City Amber & Ink default, responsive layouts, keyboard focus styling, and a reduced-motion option.
- **Demo experience:** A navigation-bar role switcher makes it easy to explore customer, captain, and admin views.

## Technology

| Area | Stack |
|---|---|
| Client | React 19, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion |
| Server | Node.js, Express, TypeScript, Socket.IO |
| Data | Prisma ORM with SQLite by default |
| Validation and security middleware | Zod, Helmet, CORS |
| Maps | Leaflet, OpenStreetMap, OSRM, Nominatim |
| Tests | Vitest, React Testing Library, Supertest |

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Getting started

Run these commands from the repository root.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the server

Copy the example environment file to the server workspace:

```powershell
Copy-Item .env.example server\.env
```

On macOS or Linux, use `cp .env.example server/.env` instead. Edit `server/.env` for your local setup. In particular, replace the example `JWT_SECRET` with a unique, private value. Keep credentials and production keys out of source control.

The example configuration enables demo mode and uses SQLite. The main settings are:

| Variable | Purpose |
|---|---|
| `PORT` | API server port (default: `5000`) |
| `DATABASE_URL` | Prisma database connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `JWT_EXPIRES_IN` | Token lifetime |
| `CORS_ORIGIN` | Allowed client origin (default: `http://localhost:5173`) |
| `ENABLE_DEMO_MODE` | Enables demo-specific behavior |
| `OSRM_ROUTING_URL` | Routing service endpoint |
| `NOMINATIM_GEOCODE_URL` | Geocoding service endpoint |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Payment integration settings, when configured |

### 3. Initialize the database

Generate the Prisma client, create/update the local database schema, and load seed data:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. Start the application

```bash
npm run dev
```

Open the client at <http://localhost:5173>. The API runs at <http://localhost:5000>; its health endpoint is <http://localhost:5000/api/health>. Use the navigation-bar demo role switcher to explore the available application views.

## Application routes

| Path | Description |
|---|---|
| `/` | Landing page and ride estimate |
| `/book` | Ride booking |
| `/ride/:id` | Ride tracking |
| `/history` | Ride history |
| `/profile` | Customer profile and saved information |
| `/offers` | Offers and coupons |
| `/safety` | Safety information |
| `/driver` | Captain dashboard |
| `/admin` | Admin dashboard |
| `/login`, `/register` | Authentication pages |

## API

The server exposes a health check at `GET /api/health` and versioned endpoints under `/api/v1`:

| Prefix | Area |
|---|---|
| `/api/v1/auth` | Authentication |
| `/api/v1/rides` | Ride requests and ride management |
| `/api/v1/driver` | Captain operations |
| `/api/v1/admin` | Admin operations |
| `/api/v1/coupons` | Coupons |
| `/api/v1/addresses` | Saved addresses |
| `/api/v1/notifications` | Notifications |
| `/api/v1/support` | Support |
| `/api/v1/geocode` | Location search |

## Development commands

Run the full test suite:

```bash
npm test
```

Run one workspace's tests:

```bash
npm run test:client
npm run test:server
```

Type-check the client:

```bash
npm run lint
```

Build both workspaces:

```bash
npm run build
```

The root `package.json` also provides `dev:client`, `dev:server`, `build:client`, and `build:server` commands.

## Project layout

```text
client/
  src/
    components/   Shared UI, booking, and map components
    context/      Authentication and theme state
    pages/        Customer, captain, and admin screens
    services/     Client API access
server/
  prisma/         Database schemas and seed data
  src/
    controllers/  Request handlers
    middleware/   Express middleware
    routes/       API route registration
    services/     Fare, routing, payment, and Socket.IO services
    validators/   Request schemas
```

## Integrations and deployment notes

- Map tiles, routing, and geocoding use external services. Their availability and usage limits depend on those providers; configure suitable services for a production deployment.
- The default setup is intended for local development and demos. Set secure environment values, restrict CORS, review authentication and demo-mode behavior, and choose an appropriate database and payment configuration before deployment.
- Never commit `server/.env`, private keys, payment credentials, or production secrets.
