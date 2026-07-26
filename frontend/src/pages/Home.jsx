import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Workflow from "@/components/home/Workflow";
import TechStack from "@/components/home/TechStack";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Workflow />
      <TechStack />
      <Stats />
      <CTA />
    </>
  );
}