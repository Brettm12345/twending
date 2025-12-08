# Twending

<img alt="Twending" src="https://media.cleanshot.cloud/media/79927/tUbQvOvrUDieFnClBVaOUTlT5qH6pmai9cWJ1Tyb.jpeg?Expires=1765184642&Signature=J6W3nXp-2yLq5cPJph9wDPHSC280Gz~pI083liEkSi4Qp-FAaZ-nyiO3N9dTM3~1MNzKg7KwAKpKgZfg3nVpaJmeoB2h8eKWUZgkoqmhw4TybSGJrr3qSW79QzPeNQOJDl2TZfC7ZOhopIOEvbQ-qtoGn~JoO9K2ePTyHgQo88XWp5CujiZaiV1WWJbzjXB~OofIHRsMuVR2j-ZFr0Era06yAbpwLBQOFVZvy6cc2SroaNT6as5jZdEARPKnFv7N0tMmk6Is82O9qCJDNcDfYtTyRPMNTTU2vWdpD2EP6jf0ahbuyT2rlEDH3roWRmIFpVUEjJVlidyhBF4DeQV3cA__&Key-Pair-Id=K269JMAT9ZF4GZ">

Twending is a new way to view trending repositories from github.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **tRPC** - End-to-end type-safe APIs

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the web application.

## Project Structure

```
twending/
├── apps/
│   └── web/         # Fullstack application (React + TanStack Start)
├── packages/
│   ├── api/         # API layer / business logic
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run lint`: Lint all code
- `pnpm run lint:fix`: Fix lint errors
- `pnpm run format`: Format all code
