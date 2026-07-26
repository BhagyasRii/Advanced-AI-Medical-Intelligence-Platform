import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">

      <h1 className="text-8xl font-black">
        404
      </h1>

      <p className="mt-5 text-slate-600">
        Page not found.
      </p>

      <Link
        to="/"
        className="mt-10 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Go Home
      </Link>

    </div>
  );
}