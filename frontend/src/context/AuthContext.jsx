import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { loginRequest, registerRequest, getCurrentUser, tokenStorage } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // On first load, if a token is already stored, try to resolve the user.
  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setInitializing(false);
      return;
    }
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        tokenStorage.clear();
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, []);

  // If any API call comes back 401, the interceptor clears the token and
  // fires this event — log the user out client-side too.
  useEffect(() => {
    const onExpire = () => setUser(null);
    window.addEventListener("medai-auth-expired", onExpire);
    return () => window.removeEventListener("medai-auth-expired", onExpire);
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await loginRequest(credentials);
    tokenStorage.set(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await registerRequest(payload);
    tokenStorage.set(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, initializing, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
