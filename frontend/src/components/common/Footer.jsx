import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t bg-white">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-3">

        <div>
          <Logo />

          <p className="mt-6 text-sm leading-7 text-slate-600">
            AI-powered chest X-ray analysis platform built using
            React, FastAPI, PyTorch, Explainable AI, and Gemini.
          </p>
        </div>

        <div>

          <h3 className="font-semibold">
            Navigation
          </h3>

          <ul className="mt-5 space-y-3 text-slate-600">

            <li>Home</li>

            <li>Prediction</li>

            <li>About</li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold">
            Technologies
          </h3>

          <ul className="mt-5 space-y-3 text-slate-600">

            <li>React</li>

            <li>FastAPI</li>

            <li>PyTorch</li>

            <li>Gemini AI</li>

          </ul>

        </div>

      </div>

      <div className="border-t py-6 text-center text-sm text-slate-500">
        © 2026 Advanced AI Medical Intelligence Platform
      </div>

    </footer>
  );
}