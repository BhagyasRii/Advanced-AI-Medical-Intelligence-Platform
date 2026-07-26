import GlassCard from "@/components/common/GlassCard";

export default function FeatureCard({

icon: Icon,

title,

description,

}){

return(

<GlassCard
className="
group
p-8
transition
duration-300
hover:-translate-y-2
hover:border-cyan-400/30
"
>

<div
className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-cyan-500/10
"
>

<Icon
size={30}
className="
text-cyan-400
group-hover:scale-110
transition
"
/>

</div>

<h3
className="
mt-8
text-2xl
font-bold
text-white
"
>

{title}

</h3>

<p
className="
mt-4
leading-7
text-slate-400
"
>

{description}

</p>

</GlassCard>

);

}