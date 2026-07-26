import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroActions() {

  return (

    <div className="mt-12 flex flex-wrap gap-5">

      <Button

        size="lg"

        className="h-14 rounded-2xl bg-cyan-500 px-8 text-black hover:bg-cyan-400"

      >

        Start Diagnosis

        <ArrowRight className="ml-2 h-5 w-5" />

      </Button>

      <Button

        variant="outline"

        size="lg"

        className="h-14 rounded-2xl border-cyan-500/30 bg-transparent text-white hover:bg-white/5"

      >

        View Architecture

      </Button>

    </div>

  );

}