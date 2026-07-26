import { Outlet } from "react-router-dom";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

import BackgroundGlow from "@/components/layout/BackgroundGlow";
import GridOverlay from "@/components/layout/GridOverlay";

export default function MainLayout(){

return(

<div className="relative min-h-screen bg-[#05070B] text-white">

<BackgroundGlow/>

<GridOverlay/>

<div className="relative z-10">

<Navbar/>

<Outlet/>

<Footer/>

</div>

</div>

);

}