export default function DiagnosisBadge({

label="NORMAL",

color="cyan"

}){

const colors={

cyan:"bg-cyan-500/20 text-cyan-300 border-cyan-400/30",

green:"bg-green-500/20 text-green-300 border-green-400/30",

red:"bg-red-500/20 text-red-300 border-red-400/30",

yellow:"bg-yellow-500/20 text-yellow-300 border-yellow-400/30"

};

return(

<div
className={`
inline-flex
items-center
rounded-full
border
px-4
py-2
text-sm
font-semibold
${colors[color]}
`}
>

{label}

</div>

);

}