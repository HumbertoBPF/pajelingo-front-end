import AboutUsCard from "components/AboutUsCard";
import data from "./data.json"

export default function AboutUs() {
    return (
        data.items.map(item => <AboutUsCard key={item.id} image={item.image}>{item.text}</AboutUsCard>)
    );
}