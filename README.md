# Peranti Enterprise MVP

A full-stack, enterprise-grade Minimum Viable Product (MVP) featuring advanced JWT authentication, RBAC middleware, and real-time WebSocket capabilities via Cloudflare Durable Objects.

## Architecture
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Edge Backend:** Cloudflare Workers, Hono, Durable Objects (WebSockets)
- **Database:** Cloudflare D1 (Serverless SQLite)
- **Security:** JWT Authentication, Edge Middleware (Next.js)

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or pnpm
- Wrangler CLI (Cloudflare)

### 2. Installation
```bash
npm install
```

### 3. Local Development (Backend API)
```bash
npm run worker:dev
```

### 4. Local Development (Frontend)
```bash
npm run dev
```

### 5. Deployment
Deploy to Cloudflare Pages (Frontend) and Cloudflare Workers (Backend) using GitHub integration.
