# 04-auth

Express and MongoDB API with cookie-based authentication and user-owned notes.

## Run locally

1. Install Node.js 20 or newer and MongoDB.
2. Copy `.env.example` to `.env` and set `MONGO_URL`.
3. Install dependencies with `npm install`.
4. Start the server with `npm run dev` (or `npm start`).

The API listens on `PORT` (default `3000`). Authentication endpoints are mounted at `/auth`; protected note endpoints are mounted at `/notes`. Cookies are configured for cross-site HTTPS use (`Secure`, `SameSite=None`), so browser-based local testing requires HTTPS.

The Render blueprint is in `render.yaml`. Set `MONGO_URL` and, when using a separate frontend, `CLIENT_URL` in the Render service environment.

Repository: https://github.com/Andrii-x/04-auth