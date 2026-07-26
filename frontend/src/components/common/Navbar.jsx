import Logo from "./Logo";
import NavMenu from "./NavMenu";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header
      className="
      sticky
      top-0
      z-50
      border-b
      border-white/5
      bg-black/40
      backdrop-blur-xl
    "
    >
      <div className="section flex h-20 items-center justify-between">

        <Logo />

        <NavMenu />

        <Button
          className="
          rounded-xl
          bg-cyan-500
          px-6
          text-black
          hover:bg-cyan-400
        "
        >
          Start Diagnosis
        </Button>

      </div>
    </header>
  );
}