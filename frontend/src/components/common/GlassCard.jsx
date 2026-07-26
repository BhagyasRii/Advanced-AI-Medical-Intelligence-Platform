export default function GlassCard({

children,

className=""

}){

return(

<div

className={`
glass
rounded-3xl
${className}
`}

>

{children}

</div>

);

}