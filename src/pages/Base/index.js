import Footer from "components/Footer";
import Menu from "components/Menu";
import { Outlet } from "react-router-dom";

export default function Base() {
    return (
        <>
            <Menu/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}