import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const links = [
  { to: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { to: "/upload", icon: "add_circle", label: "New Analysis" },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] w-72 fixed left-0 bg-surface border-r border-outline-variant/30 p-sm space-y-base overflow-y-auto">
      <div className="mb-lg p-sm bg-surface-container-low rounded-xl">
        <div className="flex items-center gap-sm mb-xs">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-on-primary">
            <Icon name="dashboard" />
          </div>
          <div>
            <h2 className="font-body-md text-body-md font-bold">MedAI Pulse</h2>
            <p className="text-label-md font-label-md text-on-surface-variant">Diagnostics Hub</p>
          </div>
        </div>
      </div>
      <nav className="space-y-base flex-grow">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            end={link.to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-sm px-sm py-md rounded-lg font-body-md text-body-md transition-all ease-out duration-300 ${
                isActive
                  ? "bg-secondary-container text-on-secondary-container font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`
            }
          >
            <Icon name={link.icon} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="pt-lg border-t border-outline-variant/20">
        <div className="p-sm bg-error-container/20 rounded-lg flex items-center gap-sm">
          <Icon name="verified_user" className="text-error" />
          <span className="text-label-md font-label-md text-error font-bold uppercase">Clinical Mode Active</span>
        </div>
      </div>
    </aside>
  );
}
