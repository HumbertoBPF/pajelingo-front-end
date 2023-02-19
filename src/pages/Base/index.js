import Carousel from "components/Carousel";
import Footer from "components/Footer";
import Menu from "components/Menu";
import { Outlet } from "react-router-dom";

export default function Base() {
    return (
        <>
            <Menu/>
            <main className="container-fluid">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}