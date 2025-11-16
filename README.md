# Clean Water Finder
DEPLOYMENT LINK   https://clean-water-finder-8fym.vercel.app/

A small full-stack app to report and find water sources.

This README covers setup, environment variables, running the app, authentication usage, mobile tips, and troubleshooting.

## Quick start

1. Backend

```powershell
cd C:\Users\Admin\Desktop\project1\backend
npm install
# create .env with MONGODB_ATLAS_URI and (optional) JWT_SECRET
node server.js
```

2. Frontend (dev)

```powershell
cd C:\Users\Admin\Desktop\project1\frontend
npm install
npm run dev
```

Open the app in your browser at the Vite URL shown in the terminal. The root `/` page will show the Login screen.

## Environment variables

backend/.env

```
MONGODB_ATLAS_URI=<your_mongo_connection_string>
PORT=5000
JWT_SECRET=<strong_jwt_secret>
```

frontend/.env (optional for Vite)

```
VITE_API_URL=http://localhost:5000
```

Notes:
- The backend must be started from the `backend` folder so it can load `backend/.env` correctly.
- If `MONGODB_ATLAS_URI` is missing you'll see errors like: `The 'uri' parameter to 'openUri()' must be a string, got "undefined"`.

## Authentication

This project includes a simple JWT-based auth flow:

- `POST /api/auth/register` — register with `{ name, email, password }` and receive `{ token, user }`.
- `POST /api/auth/login` — login with `{ email, password }` and receive `{ token, user }`.

The frontend stores the JWT in `localStorage` and sends it on each request via the `Authorization: Bearer <token>` header.

Protected endpoints:
- `GET /api/water-sources` — requires a valid token
- `POST /api/water-sources` — requires a valid token

## Mobile considerations

The UI was updated to be mobile-friendly:
- Navbar uses a responsive layout and touch-friendly buttons.
- Login is the default landing page so mobile users can sign in quickly.
- Buttons and inputs use large tap targets.

If you want a more polished mobile UX, consider:
- Adding a responsive hamburger menu for small screens
- Using React Context to persist user state and update UI instantly on login/logout
- Improving form layout and validation for small screens

## Troubleshooting

- Mongoose `uri` undefined: ensure `backend/.env` exists and contains `MONGODB_ATLAS_URI`. Start the backend from the `backend` directory.
- MongoDB Atlas `Could not connect`: add your IP in Atlas Network Access (whitelist) or use `0.0.0.0/0` for development.
- 401 Unauthorized when fetching protected endpoints:
  - Ensure you are logged in and a token is stored in `localStorage` under `token`.
  - In DevTools, inspect the request headers to confirm `Authorization` is sent.

## APIs (summary)

- GET /api/water-sources
- POST /api/water-sources
- GET /api/water-sources/:id
- POST /api/auth/register
- POST /api/auth/login

## Next steps / Improvements

- Add user context for reactive UI and avoid reloads on logout
- Draw routes inside the map (leaflet-routing-machine) instead of opening Google Maps
- Add form validation and nicer mobile layout

If you want, I can also create a short `DEVELOPMENT.md` with commands and common debugging steps.
