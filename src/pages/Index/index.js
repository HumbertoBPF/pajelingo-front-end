import { Carousel } from "react-bootstrap";
import data from "./data.json"

export default function Index() {
    return (
        <div className="row justify-content-center">
            <Carousel className="carousel slide col-md-8">
                { data.items.map(
                    (item) => 
                        <Carousel.Item key={item.id}>
                            <img
                                className="d-block w-100"
                                src={item.image}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                ) }
            </Carousel>
        </div>
    )
}