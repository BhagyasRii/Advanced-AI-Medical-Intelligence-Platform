import DiagnosisBadge from "./DiagnosisBadge";

export default function MedicalHUD(){

return(

<div className="absolute left-6 top-6">

<DiagnosisBadge

label="AI READY"

/>

<div className="mt-5 space-y-2 text-xs text-slate-400">

<p>

MODEL : DenseNet121

</p>

<p>

XRAY : Chest PA

</p>

<p>

STATUS : Online

</p>

</div>

</div>

);

}