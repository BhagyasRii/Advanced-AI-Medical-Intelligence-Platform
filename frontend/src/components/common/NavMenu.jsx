import { NavLink } from "react-router-dom";

const links = [
  {
    title: "Overview",
    path: "/",
  },
  {
    title: "Diagnosis",
    path: "/predict",
  },
  {
    title: "Results",
    path: "/results",
  },
  {
    title: "Reports",
    path: "/report",
  },
  {
    title: "About",
    path: "/about",
  },
];

export default function NavMenu() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {links.map((item) => (
        <NavLink
          key={item.title}
          to={item.path}
          className={({ isActive }) =>
            `relative text-sm transition ${
              isActive
                ? "text-cyan-400"
                : "text-slate-400 hover:text-white"
            }`
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}