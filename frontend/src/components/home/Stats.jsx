export default function Stats(){

const stats=[
["98.7%","Model Accuracy"],
["6+","Disease Classes"],
["<2s","Prediction Time"],
["24/7","AI Availability"]
];

return(

<section className="bg-blue-600 py-20 text-white">

<div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">

{stats.map(([v,l])=>(

<div key={l} className="text-center">

<h2 className="text-5xl font-black">
{v}
</h2>

<p className="mt-4">
{l}
</p>

</div>

))}

</div>

</section>

);

}