import BackgroundGlow from "@/components/layout/BackgroundGlow";
import GridOverlay from "@/components/layout/GridOverlay";
import FloatingParticles from "@/components/layout/FloatingParticles";
import ScanLines from "@/components/layout/ScanLines";

export default function HeroBackground() {
  return (
    <>
      <BackgroundGlow />

      <GridOverlay />

      <FloatingParticles />

      <ScanLines />
    </>
  );
}