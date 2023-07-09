import AboutUsCard from "components/cards/AboutUsCard";
import data from "./data.json";

export default function AboutUs() {
  return data.items.map((item) => (
    <AboutUsCard
      key={item.id}
      item={item}
      image={item.image}
      testId={`${item.id}-about-us-card`}>
      {item.text}
    </AboutUsCard>
  ));
}
