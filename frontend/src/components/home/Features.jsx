import {

Brain,

FileText,

Shield,

Download,

Activity,

Zap,

} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [

{
icon:Brain,
title:"AI Diagnosis",
description:"DenseNet121 powered disease prediction."
},

{
icon:Activity,
title:"Grad-CAM",
description:"Explainable AI visualization."
},

{
icon:FileText,
title:"Gemini Reports",
description:"Clinical reasoning generated automatically."
},

{
icon:Shield,
title:"Medical AI",
description:"Reliable decision support."
},

{
icon:Zap,
title:"Real-time Backend",
description:"FastAPI inference engine."
},

{
icon:Download,
title:"PDF Export",
description:"Professional downloadable reports."
}

];

export default function Features(){

return(

<section className="section py-36">

<h2
className="
mb-20
text-center
text-5xl
font-black
text-white
"
>

Capabilities

</h2>

<div
className="
grid
gap-8
md:grid-cols-2
xl:grid-cols-3
"
>

{

features.map((feature)=>(

<FeatureCard

key={feature.title}

{...feature}

/>

))

}

</div>

</section>

);

}