# Order confirmation email server

This server sends order confirmation emails to customers when they place an order.

## Setup

1. **Install dependencies** (run from repo root with `npm run server`, or from here):
   ```bash
   cd server && npm install
   ```

2. **Configure Resend** (required for real emails):
   - Sign up at [resend.com](https://resend.com) and create an API key.
   - Copy `server/.env.example` to `server/.env`.
   - Set `RESEND_API_KEY=re_xxxxxxxx` in `server/.env`.

   Without `RESEND_API_KEY`, the server still runs and orders complete; emails are skipped and a warning is logged.

## Running

- **Email server only:** from repo root run `npm run server` (starts on port 3001).
- **Website + email server:** run `npm run dev:all` from repo root (runs both Vite and this server).

The frontend proxies `/api` to this server when using `npm run dev`.
