import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CTA(){

return(

<section className="py-28">

<div className="mx-auto max-w-4xl rounded-3xl bg-slate-900 px-10 py-20 text-center text-white">

<h2 className="text-5xl font-black">
Ready to Experience AI Diagnosis?
</h2>

<p className="mx-auto mt-8 max-w-2xl text-lg text-slate-300">

Upload a chest X-ray and receive explainable AI predictions with a clinical report in seconds.

</p>

<Link to="/predict">

<Button
size="lg"
className="mt-10 bg-blue-600 hover:bg-blue-700"
>

Start Analysis

</Button>

</Link>

</div>

</section>

);

}