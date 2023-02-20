export default function CarouselItem({ active, image, title, description }) {
    return (
        <div className={`carousel-item ${active?"active":""}`} data-bs-interval="5000">
            <img src={image} className="d-block w-100" alt="Conjugation game image"/>
            <div className="carousel-caption">
                <h5>{title}</h5>
                <p>{description}</p>
            </div>
        </div>
    )
}