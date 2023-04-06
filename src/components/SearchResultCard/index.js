import { useNavigate } from "react-router-dom";
import styles from "./SearchResultCard.module.css";
import { useState } from "react";
import { baseUrl } from "services/base";
import { useSelector } from "react-redux";

export default function SearchResultCard({ word, flagImage }) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [result, setResult] = useState(word);

    function toogleHeartIcon() {
        if (user) {
            fetch(`${baseUrl}/words/${word.id}/favorite-word`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${user.token}`,
                },
                body: JSON.stringify({
                    is_favorite: !result.is_favorite
                })
            }).then(
                response => response.ok?response.json():null
            ).then(
                data => {
                    if (data !== null) {
                        setResult(data);
                    }
                }
            );
        }
    }

    function renderHeartIcon() {
        if (result.is_favorite) {
            return (
                <svg onClick={() => toogleHeartIcon()} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-heart-fill ${styles["icon-heart"]}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
            );
        }
        return (
            <svg onClick={() => toogleHeartIcon()} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-heart ${styles["icon-heart"]}`} viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
        );
    }

    return (
        <div className="col-6 col-sm-4 my-1">
            {
                // eslint-disable-next-line
            }<a className="text-reset text-decoration-none" href="#">
                <div className={`card ${styles["search-card"]}`}>
                    {(user)?renderHeartIcon():null}
                    <div className="row g-0" onClick={() => navigate(`/meanings/${word.id}`)}>
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