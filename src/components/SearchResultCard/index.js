import { useNavigate } from "react-router-dom";
import styles from "./SearchResultCard.module.css";

export default function SearchResultCard({ word, flagImage }) {
    const navigate = useNavigate();

    return (
        <div className="col-6 col-sm-4 my-1">
            <a className="text-reset text-decoration-none" href="#" onClick={() => navigate(`/meanings/${word.id}`)}>
                <div className={`card ${styles["search-card"]}`}>
                    <div className="row g-0">
                        <div className="col-md-4 px-4 d-flex align-items-center justify-content-center">
                            <div>
                                <img 
                                    src={`data:image/jpeg;base64,${flagImage}`} 
                                    className="img-fluid rounded-start" 
                                    alt={`${word.language} language flag`}/>
                            </div>
                        </div>
                        <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <div className="card-body text-center">
                                <p className="card-text">{word.word_name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}