import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <div
        className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-cyan-500/10
        border
        border-cyan-400/20
        shadow-[0_0_30px_rgba(0,229,255,.15)]
      "
      >
        <Activity
          size={24}
          className="text-cyan-400"
        />
      </div>

      <div>
        <h1 className="text-lg font-bold text-white">
          Pulse AI
        </h1>

        <p className="text-xs text-slate-500">
          Medical Intelligence
        </p>
      </div>
    </Link>
  );
}