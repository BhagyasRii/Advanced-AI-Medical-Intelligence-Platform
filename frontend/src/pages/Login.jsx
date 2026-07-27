import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.detail || "Invalid email or password. Check that the auth API is running and reachable."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full px-gutter h-16 flex items-center max-w-content mx-auto">
        <Link to="/" className="flex items-center gap-xs">
          <Icon name="clinical_notes" filled className="text-primary text-headline-md" />
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">MedAI Pulse</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-gutter">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-3xl p-lg shadow-xl">
            <div className="text-center mb-lg space-y-xs">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-sm">
                <Icon name="verified_user" className="text-primary" size={28} />
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Clinical Sign In</h1>
              <p className="text-on-surface-variant font-body-sm text-body-sm">
                Access requires an authorized clinical staff account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-md">
              <div className="space-y-base">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@hospital.org"
                  className="w-full h-11 px-sm rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-base">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 px-sm pr-10 rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
                  >
                    <Icon name={showPassword ? "visibility_off" : "visibility"} size={20} />
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-sm bg-error-container/20 border border-error/20 rounded-lg flex items-center gap-xs text-error font-body-sm">
                  <Icon name="error" size={18} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-on-primary font-bold py-md rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-xs disabled:opacity-60"
              >
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-md">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
