import HeroActions from "./HeroActions";
import HeroStats from "./HeroStats";

export default function HeroContent() {

  return (

    <div>

      <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2">

        <span className="text-sm font-medium text-cyan-300">

          AI Powered Chest X-Ray Diagnosis

        </span>

      </div>

      <h1 className="text-6xl font-black leading-tight xl:text-7xl">

        Advanced

        <br />

        <span className="gradient-text">

          Medical Intelligence

        </span>

      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

        Upload chest X-ray images and receive AI-powered disease
        detection, Grad-CAM visualization and Gemini generated
        clinical reports in seconds.

      </p>

      <HeroActions />

      <HeroStats />

    </div>

  );

}