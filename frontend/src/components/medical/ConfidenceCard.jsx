import GlassCard from "@/components/common/GlassCard";

export default function ConfidenceCard(){

return(

<GlassCard className="p-5">

<p className="text-xs text-slate-400">

AI Confidence

</p>

<h2 className="mt-2 text-4xl font-bold text-cyan-400">

98.7%

</h2>

<div className="mt-5 h-2 rounded-full bg-slate-700">

<div

className="h-full rounded-full bg-cyan-400"

style={{

width:"98.7%"

}}

>

</div>

</div>

</GlassCard>

);

}