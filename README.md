# Advanced AI Medical Intelligence Platform

An end-to-end medical imaging platform that combines deep learning, explainability, and natural language reporting for chest X-ray diagnostics.

## Key Features

- AI-powered chest X-ray classification
- Grad-CAM explainability overlays
- Automated medical report generation
- Secure authentication and user history
- FastAPI backend with REST endpoints
- React + Vite frontend dashboard

## Repository Structure

- `backend/` - legacy or alternate backend package and Docker support
- `configs/` - central configuration definitions
- `data/` - sample inputs and dataset helpers
- `frontend/` - React UI and Vite app
- `src/` - primary FastAPI backend, ML, auth, and app routes
- `scripts/` - utilities for training, inference, and dataset analysis
- `tests/` - unit test suite
- `uploads/` - uploaded exam images
- `outputs/` - generated Grad-CAM heatmaps and checkpoints

## Prerequisites

- Python 3.10+ (recommended)
- Node.js 18+ / npm
- Git
- Optional: MySQL server if using the default SQL backend

## Local Setup

### Backend

1. Create and activate a Python virtual environment:

   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Ensure the `.env` file exists at the repository root and contains required values like database connection settings and API keys.

4. Start the FastAPI backend from the repository root:

   ```bash
   .venv\Scripts\python -m uvicorn src.api.app:app --reload
   ```

### Frontend

1. Change into the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. If the backend is served from a different address, set `VITE_API_BASE_URL` in `frontend/.env`.

## Running the App

- Backend API: `http://localhost:8000`
- Frontend app: `http://localhost:5173`

The frontend expects the backend API under `/api`, so the default backend base URL is `http://localhost:8000/api`.

## Authentication

- Login and registration are implemented in `frontend/src/pages/Login.jsx` and `Register.jsx`.
- Auth state is managed in `frontend/src/context/AuthContext.jsx`.
- Protected routes are enforced via `frontend/src/components/ProtectedRoute.jsx`.

## Prediction Flow

1. Upload an image via the frontend upload page.
2. The backend saves the image, runs inference, generates Grad-CAM heatmap, and stores results.
3. The prediction page fetches history and renders the report, probabilities, and Grad-CAM overlay.

## Important Backend Files

- `src/api/app.py` - FastAPI app definition and middleware
- `src/api/routes.py` - prediction and history endpoints
- `src/auth/security.py` - password hashing and JWT management
- `src/inference/predictor.py` - inference and Grad-CAM generation
- `src/database/crud.py` - persistence helpers
- `src/database/models.py` - database schema definitions

## Important Frontend Files

- `frontend/src/pages/Dashboard.jsx` - main dashboard and history view
- `frontend/src/pages/UploadPrediction.jsx` - image upload workflow
- `frontend/src/pages/PredictionResults.jsx` - result detail page
- `frontend/src/services/api.js` - API wrapper and auth handling

## Notes

- A Grad-CAM static route has been mounted at `/gradcam` so backend image overlays are served correctly.
- The login page helper text has been removed and logout now redirects users to the public landing page `/`.
- The `requirements.txt` file now pins `bcrypt==3.2.0` to avoid passlib compatibility warnings.

## Troubleshooting

- If you encounter bcrypt/passlib warnings, ensure your virtual environment has `bcrypt==3.2.0` installed.
- If the frontend cannot reach the backend, verify `VITE_API_BASE_URL` and backend startup address.
- If prediction history is missing, confirm the authenticated user and `/api/history` API response.

## Testing

Run tests from the repository root using your Python environment:

```bash
.venv\Scripts\python.exe -m pytest
```

## License

This project is provided as-is for development and demonstration purposes.
