import GlassCard from "@/components/common/GlassCard";

import ConfidenceCard from "@/components/medical/ConfidenceCard";

import ScanFrame from "@/components/medical/ScanFrame";

import MedicalHUD from "@/components/medical/MedicalHUD";

export default function HeroScan(){

return(

<div className="relative flex justify-center">

<GlassCard
className="relative h-[650px] w-[520px] overflow-hidden rounded-[42px]"
>

<ScanFrame/>

<MedicalHUD/>

<div

className="absolute inset-0 flex items-center justify-center"

>

<div className="text-center">

<div className="mb-6 text-7xl">

🫁

</div>

<h2 className="text-2xl font-bold text-cyan-400">

Chest X-Ray Scanner

</h2>

<p className="mt-4 text-slate-500">

Three.js scene will render here

</p>

</div>

</div>

<div

className="absolute left-0 top-1/2 h-[2px] w-full bg-cyan-400/70"

style={{

animation:"scanner 4s linear infinite"

}}

>

</div>

</GlassCard>

<div className="absolute -left-12 top-24 w-60">

<ConfidenceCard/>

</div>

</div>

);

}