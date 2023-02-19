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
                <div className="carousel-item active" data-bs-interval="5000">
                    <img src="/images/vocabulary_game.jpg" className="d-block w-100" alt="Vocabulary training image"/>
                    <div className="carousel-caption">
                    <h5>Vocabulary training</h5>
                    <p>Practice your vocabulary!</p>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="5000">
                    <img src="/images/article_game.jpg" className="d-block w-100" alt="Guess the article image"/>
                    <div className="carousel-caption">
                    <h5>Guess the article</h5>
                    <p>Guess the article that matches the showed word!</p>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="5000">
                    <img src="/images/conjugation_game.jpg" className="d-block w-100" alt="Conjugation game image"/>
                    <div className="carousel-caption">
                    <h5>Conjugation game</h5>
                    <p>Can you guess all the conjugations in any tense and mode?</p>
                    </div>
                </div>
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