export default function TechStack(){

const tech=[
"React",
"FastAPI",
"PyTorch",
"Gemini",
"Tailwind",
"shadcn/ui",
"Framer Motion",
"Recharts"
];

return(

<section className="py-24">

<div className="mx-auto max-w-7xl px-6">

<h2 className="text-center text-5xl font-black">
Technology Stack
</h2>

<div className="mt-16 flex flex-wrap justify-center gap-4">

{tech.map((t)=>(

<div
key={t}
className="rounded-full bg-blue-100 px-6 py-3 font-semibold text-blue-700"
>
{t}
</div>

))}

</div>

</div>

</section>

);

}