import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await register({ name, email, password, role });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || "Couldn't create the account. Check that the auth API is reachable.");
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

      <main className="flex-grow flex items-center justify-center px-gutter py-lg">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-3xl p-lg shadow-xl">
            <div className="text-center mb-lg space-y-xs">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-sm">
                <Icon name="person_add" className="text-primary" size={28} />
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Create Clinical Account</h1>
              <p className="text-on-surface-variant font-body-sm text-body-sm">
                Register with your institutional email to request access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-md">
              <div className="space-y-base">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Doe"
                  className="w-full h-11 px-sm rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>
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
    <label className="font-label-md text-label-md">
        Role
    </label>

    <select
        value={role}
        onChange={(e)=>setRole(e.target.value)}
        className="w-full h-11 px-sm rounded-lg border border-outline-variant bg-white"
    >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
    </select>
</div>


              <div className="space-y-base">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full h-11 px-sm rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
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
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-md">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
