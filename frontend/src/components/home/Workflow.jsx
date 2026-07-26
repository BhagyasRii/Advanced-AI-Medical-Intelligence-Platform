export default function Workflow(){

const steps=[
"Upload",
"AI Analysis",
"Prediction",
"Gemini Report",
"Grad-CAM",
"Download"
];

return(

<section className="bg-slate-100 py-24">

<div className="mx-auto max-w-7xl px-6">

<h2 className="text-center text-5xl font-black">
Workflow
</h2>

<div className="mt-20 grid gap-8 md:grid-cols-6">

{steps.map((step,index)=>(

<div
key={step}
className="rounded-2xl bg-white p-6 text-center shadow"
>

<div className="text-4xl font-black text-blue-600">
0{index+1}
</div>

<h3 className="mt-5 font-semibold">
{step}
</h3>

</div>

))}

</div>

</div>

</section>

);

}