import { useNavigate } from "react-router-dom";
import styles from "./SearchResultCard.module.css";
import { useState } from "react";
import { baseUrl } from "services/base";
import { useSelector } from "react-redux";
import HeartIcon from "components/HeartIcon";

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

    return (
        <div className="col-6 col-sm-4 my-1">
            {
                // eslint-disable-next-line
            }<a className="text-reset text-decoration-none" href="#">
                <div className={`card ${styles["search-card"]}`}>
                    {
                        (result.is_favorite === null)?
                        null:
                        <HeartIcon className={styles["icon-heart"]} width="1.5em" height="1.5em" 
                            fill={result.is_favorite} onClick={(event) => toogleHeartIcon()}/>
                    }
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