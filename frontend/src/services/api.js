import axios from "axios";

// Base URL for the FastAPI backend. Override by setting VITE_API_BASE_URL
// in a .env file at the project root, e.g. VITE_API_BASE_URL=http://localhost:8000/api
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
export const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

const TOKEN_KEY = "medai_pulse_token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Attach the bearer token to every request, if we have one.
api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the backend says the token is invalid/expired, clear it so the app
// redirects to the login screen instead of looping on failed requests.
// AuthContext subscribes to this event to update its state.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      tokenStorage.clear();
      window.dispatchEvent(new Event("medai-auth-expired"));
    }
    return Promise.reject(error);
  }
);

/**
 * POST /auth/login  { email, password }
 * Expected response shape: { token: string, user: { name, role, email } }
 */
export async function loginRequest(credentials) {
  const { data } = await api.post("/auth/login", credentials);

  return {
    ...data,
    token: data.access_token,
  };
}

/**
 * POST /auth/register  { name, email, password }
 * Expected response shape: { token: string, user: { name, role, email } }
 */
export async function registerRequest(payload) {
  const { data } = await api.post("/auth/register", payload);

  return {
    ...data,
    token: data.access_token,
  };
}

/**
 * GET /auth/me — resolves the current user from a stored token.
 * Expected response shape: { name, role, email }
 */
export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data;
}

/**
 * GET /dashboard/stats
 * Expected response shape:
 * {
 *   total_predictions: number,
 *   today_predictions: number,
 *   avg_confidence: number,   // 0-100
 *   last_prediction_label: string,
 *   last_prediction_status: "STABLE" | "CRITICAL" | "PENDING",
 *   weekly_trend: [{ day: "MON", count: number }, ...]
 * }
 */
export async function getDashboardStats() {
  const { data } = await api.get("/history");

  return {
    total_predictions: data.length,
    today_predictions: data.length,
    avg_confidence: 0,
    last_prediction_label:
      data.length > 0 ? data[0].prediction : "No Predictions",
    last_prediction_status: "STABLE",
    weekly_trend: [],
  };
}

/**
 * GET /predictions?limit=&search=
 * Expected response shape: array of prediction summary objects, see mockData.js
 */
export async function getPredictions() {
  const { data } = await api.get("/history");
  return data;
}

/**
 * GET /predictions/:id
 * Expected response shape: full prediction detail object, see mockData.js
 */
export async function getPredictionById(id) {
  const { data } = await api.get(`/history/${id}`);
  return data;
}

/**
 * GET /predictions/feed?limit=
 * Recent activity feed for the dashboard "Live Feed" panel.
 */

/**
 * POST /predictions  (multipart/form-data, field name: "image")
 * onUploadProgress: (percent:number) => void
 * Expected response shape: { id: string } at minimum, ideally the full
 * prediction detail object so the results page can render immediately.
 */
export async function createPrediction(
  file,
  { onUploadProgress } = {}
) {

  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/predict",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (evt) => {
        if (onUploadProgress && evt.total) {
          onUploadProgress(
            Math.round((evt.loaded * 100) / evt.total)
          );
        }
      },
    }
  );

  return data;
}


export async function deletePrediction(id) {
  const { data } = await api.delete(`/history/${id}`);
  return data;
}

/**
 * GET /predictions/:id/report.pdf -> triggers a file download
 */


export default api;
