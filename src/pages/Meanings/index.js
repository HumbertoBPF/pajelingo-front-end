import MeaningCard from "components/MeaningCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { baseUrl } from "services/base";
import styles from "./Meanings.module.css";
import CustomizedButton from "components/CustomizedButton";

export default function Meanings() {
    const params = useParams();
    const user = useSelector(state => state.user);
    const [meanings, setMeanings] = useState([]);
    const [word, setWord] = useState({ word_name: ""});

    useEffect(() => {
        // Fetching word
        let options = {};

        if (user) {
            options = {
                headers: {
                    Authorization: `Token ${user.token}`
                }
            };
        }

        fetch(`${baseUrl}/words/${params.pk}`, options).then((response) => response.json()).then((data) => setWord(data));
    }, [user, params.pk]);

    useEffect(() => {
        // Fetching meanings
        fetch(`${baseUrl}/meanings/${params.pk}`).then((response) => response.json()).then((data) => setMeanings(data));
    }, [params.pk]);

    function toggleFavoriteButton() {
        if (user) {
            fetch(`${baseUrl}/words/${word.id}/favorite-word`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${user.token}`,
                },
                body: JSON.stringify({
                    is_favorite: !word.is_favorite
                })
            }).then(
                response => response.ok?response.json():null
            ).then(
                data => {
                    if (data !== null){
                        setWord(data);
                    }
                }
            );
        }
    }

    function renderFavoriteButton(word) {
        if (word.is_favorite) {
            return (
                <>
                    {<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-heart ${styles["icon-heart"]}`} viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>} Remove from favorite words
                </>
            );
        }
        return (
            <>
                {<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-heart-fill ${styles["icon-heart"]}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>} Add to favorite words
            </>
        );
    }

    return (
        <>
            <h5 className="mb-4">Meanings of "{word.word_name}"</h5>

            {
                (word.image === null)?
                null:
                (
                    <div className="row g-0 justify-content-center mb-4">
                        <img src={`data:image/jpeg;base64,${word.image}`} className="img-fluid rounded col-md-2 col-sm-3 col-6" alt="Word meaning"/>
                    </div>
                )
            }

            {
                (meanings.length > 1)?
                meanings.map((meaning, index) => <MeaningCard key={meaning.id} index={index+1} meaning={meaning}/>)
                :
                meanings.map((meaning) => <MeaningCard key={meaning.id} meaning={meaning}/>)
            }

            {(user)?
            <div className="text-center">
                <CustomizedButton onClick={() => toggleFavoriteButton()} variant="info">
                    {renderFavoriteButton(word)}
                </CustomizedButton>
            </div>:
            null}
        </>
    )
}