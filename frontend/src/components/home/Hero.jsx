import HeroContent from "./HeroContent";
import HeroScan from "./HeroScan";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <HeroBackground />

      <div className="section relative z-10 flex min-h-screen items-center">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          <HeroContent />

          <HeroScan />

        </div>

      </div>

    </section>
  );
}