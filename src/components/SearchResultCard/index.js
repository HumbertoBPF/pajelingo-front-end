import styles from "./SearchResultCard.module.css";

export default function SearchResultCard({ word, language, flagImage }) {
    return (
        <div className="col-6 col-sm-4 my-1">
            <a className="text-reset text-decoration-none" href="#">
                <div className={`card ${styles["search-card"]}`}>
                    <div className="row g-0">
                        <div className="col-md-4 px-4 d-flex align-items-center justify-content-center">
                            <div>
                                <img 
                                    src={`data:image/jpeg;base64,${flagImage}`} 
                                    className="img-fluid rounded-start" 
                                    alt={`${language} language flag`}/>
                            </div>
                        </div>
                        <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <div className="card-body text-center">
                                <p className="card-text">{word}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}