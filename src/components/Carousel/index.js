import CarouselItem from "components/CarouselItem"
import data from "./data.json"

export default function Carousel() {
    return (
        <div className="row justify-content-center">
            <div id="carouselExampleInterval" className="carousel slide col-md-8" data-bs-ride="carousel">
                <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    { data.items.map(
                        (item, index) => 
                            <CarouselItem key={item.id} 
                                active={(index === 0)?true:false}
                                image={item.image} 
                                title={item.title} 
                                description={item.description}/>
                    ) }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}