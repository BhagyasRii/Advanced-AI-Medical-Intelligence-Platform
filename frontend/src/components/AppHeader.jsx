import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useAuth } from "../context/AuthContext";

const navLinkClasses = ({ isActive }) =>
  `font-label-md text-label-md px-base py-base rounded transition-colors ${
    isActive
      ? "text-primary font-semibold"
      : "text-on-surface-variant hover:bg-primary-container/10 hover:text-primary"
  }`;

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const displayName = user?.name || "Clinician";
  const displayRole = user?.role || "Staff";

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm h-16">
      <div className="flex justify-between items-center px-gutter h-full max-w-content mx-auto">
        <NavLink to="/dashboard" className="flex items-center gap-xs cursor-pointer active:scale-95 transition-transform">
          <Icon name="clinical_notes" filled className="text-primary text-headline-md" />
          <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">MedAI Pulse</h1>
        </NavLink>
        <div className="flex items-center gap-md">
          <nav className="hidden md:flex items-center gap-lg">
            <NavLink to="/dashboard" className={navLinkClasses}>
              DASHBOARD
            </NavLink>
            <NavLink to="/upload" className={navLinkClasses}>
              ANALYZE IMAGE
            </NavLink>
          </nav>
          <div className="relative flex items-center gap-sm pl-md border-l border-outline-variant/30" ref={menuRef}>
            <div className="text-right hidden sm:block">
              <p className="font-label-md text-label-md font-bold leading-none">{displayName}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{displayRole}</p>
            </div>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-10 h-10 rounded-full border-2 border-primary/20 bg-primary-fixed flex items-center justify-center overflow-hidden cursor-pointer hover:ring-4 ring-primary/10 transition-all"
            >
              <Icon name="person" className="text-primary" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-12 w-48 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl py-xs z-50">
                <div className="px-sm py-xs border-b border-outline-variant/20 sm:hidden">
                  <p className="font-label-md text-label-md font-bold">{displayName}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase">{displayRole}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-sm py-sm flex items-center gap-xs text-error hover:bg-error-container/10 transition-colors font-body-sm"
                >
                  <Icon name="logout" size={18} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
