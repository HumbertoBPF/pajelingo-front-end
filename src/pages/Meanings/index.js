import MeaningCard from "components/MeaningCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchLanguages } from "services/languages";

export default function Meanings() {
    const params = useParams();
    const dispatch = useDispatch();
    const languages = useSelector(state => state.languages);
    const [meanings, setMeanings] = useState([]);
    const [word, setWord] = useState({ word_name: ""});

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        // Fetching word
        let url = `http://localhost:8000/api/words/${params.pk}`;
        fetch(url).then((response) => response.json()).then((data) => setWord(data));
        // Fetching meanings
        url = `http://localhost:8000/api/meanings/${params.pk}`;
        fetch(url).then((response) => response.json()).then((data) => setMeanings(data));
    }, [languages, params.pk]);

    return (
        <>
            <h5 className="mb-4">Meanings of "{word.word_name}"</h5>

            {
                (word.image === null)?
                null:
                (
                    <div className="row g-0 justify-content-center mb-4">
                        <img src={`data:image/jpeg;base64,${word.image}`} className="img-fluid rounded col-md-2 col-sm-3 col-6" alt="Word image"/>
                    </div>
                )
            }

            {
                (meanings.length > 1)?
                meanings.map((meaning, index) => <MeaningCard key={meaning.id} index={index+1} meaning={meaning}/>)
                :
                meanings.map((meaning) => <MeaningCard key={meaning.id} meaning={meaning}/>)
            }
        </>
    )
}