# MedAI Pulse — Frontend

React + Vite + Tailwind frontend for the Advanced AI Medical Intelligence Platform, built from the provided Stitch UI screens (landing page, dashboard, upload/prediction, and results).

## Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS (design tokens ported 1:1 from the Stitch `DESIGN.md`)
- Axios for API calls
- Material Symbols Outlined for icons

## Getting started

```bash
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL to match your backend
npm run dev
```

Build for production:

```bash
npm run build   # outputs to dist/
```

## Pages

| Route            | Component               | Notes                                              |
|-------------------|--------------------------|-----------------------------------------------------|
| `/`               | `LandingPage`            | Marketing/landing page                              |
| `/dashboard`      | `Dashboard`              | Metrics, prediction trend chart, live feed, history table |
| `/upload`         | `UploadPrediction`       | Drag-and-drop upload + live analysis pipeline        |
| `/results/:id`    | `PredictionResults`      | Diagnosis, Grad-CAM viewer, LLM report tabs          |

## Authentication

`/dashboard`, `/upload`, and `/results/:id` are gated behind `ProtectedRoute` — visiting them without a valid session redirects to `/login`. Auth state lives in `src/context/AuthContext.jsx`; the JWT is stored in `localStorage` and attached to every request as `Authorization: Bearer <token>` via an Axios interceptor in `src/services/api.js`. A `401` response anywhere clears the token and bounces the user back to `/login`.

There is **no mock/demo login** — unlike the dashboard and results pages, the login/register forms do not fall back to fake data, since faking a successful sign-in would defeat the point of gating the app. You'll need your backend's auth endpoints running for sign-in to work.

Expected endpoints:

- `POST /auth/login` `{ email, password }` → `{ token, user: { name, role, email } }`
- `POST /auth/register` `{ name, email, password }` → `{ token, user: { name, role, email } }`
- `GET /auth/me` (with bearer token) → `{ name, role, email }` — used to restore a session on page reload

## Connecting to your FastAPI backend

The rest of the network calls also live in `src/services/api.js`. It expects these endpoints (adjust paths there if your backend differs):

- `GET /dashboard/stats` — summary metrics for the dashboard cards + weekly trend chart
- `GET /predictions/feed?limit=` — recent activity for the "Live Feed" panel
- `GET /predictions?limit=&search=` — table of past predictions
- `GET /predictions/:id` — full detail for the results page (diagnosis, confidence, Grad-CAM image URL, LLM report, patient info, probability distribution)
- `POST /predictions` (multipart, field `image`) — submit a new X-ray for inference; should return at least `{ id }`
- `GET /predictions/:id/report` — streams a PDF for "Generate PDF Report"

Every page tries the real API first. If a call fails (e.g. backend not running yet), the dashboard and results pages fall back to demo data from `src/services/mockData.js` so the UI still renders — delete that fallback once your backend is stable if you'd rather surface errors directly.

Response shapes the components expect are documented as JSDoc comments above each function in `src/services/api.js`, and mirrored in `src/services/mockData.js`.

## Design tokens

Colors, spacing, type scale, and radii in `tailwind.config.js` and `src/index.css` are taken directly from the Stitch `DESIGN.md` (Medical Blue `#004AC6` primary, Success Emerald `#006C49` secondary, glassmorphism cards, Inter typeface, 8px spacing scale).
