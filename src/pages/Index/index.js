import { Carousel } from "react-bootstrap";
import data from "./data.json";

export default function Index() {
  return (
    <div className="row justify-content-center">
      <Carousel className="carousel slide col-md-8" data-testid="carousel">
        {data.items.map((item) => (
          <Carousel.Item key={item.id} data-testid={`carousel-item-${item.id}`}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`${item.title}`}
              data-testid="carousel-item-image"
            />
            <Carousel.Caption>
              <h5 data-testid="carousel-item-title">{item.title}</h5>
              <p data-testid="carousel-item-description">{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
