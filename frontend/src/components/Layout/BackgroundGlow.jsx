export default function BackgroundGlow(){

return(

<>

<div

className="fixed
left-[-250px]
top-[-250px]
h-[600px]
w-[600px]
rounded-full
bg-cyan-500/20
blur-[180px]
pointer-events-none"

/>

<div

className="fixed
right-[-250px]
bottom-[-250px]
h-[600px]
w-[600px]
rounded-full
bg-blue-600/20
blur-[180px]
pointer-events-none"

/>

</>

);

}