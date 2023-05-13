export default function AboutUsCard({ image, children }) {
    return (
        <div className="card mb-4 p-4">
            <div className="row g-0">
                <div className="col-6 col-sm-4 col-md-2 d-flex align-items-center justify-content-center">
                    <div>
                        <img src={image} className="img-fluid rounded-start" alt="Welcome to Pajelingo"/>
                    </div>
                </div>
                <div className="col-6 col-sm-8 col-md-10 row">
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <p className="card-text text-center">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}