export default function AboutUsCard({ image, text }) {
    return (
        <div class="card mb-4 p-4">
            <div class="row g-0">
                <div class="col-6 col-sm-4 col-md-3 d-flex align-items-center justify-content-center">
                <div>
                    <img src={image} class="img-fluid rounded-start" alt="Welcome to Pajelingo image"/>
                </div>
                </div>
                <div class="col-6 col-sm-8 col-md-9 row">
                <div class="card-body d-flex align-items-center justify-content-center">
                    <p class="card-text text-center">{text}</p>
                </div>
                </div>
            </div>
        </div>
    );
}