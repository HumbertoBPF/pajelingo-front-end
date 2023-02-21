import Pagination from "components/Pagination";
import Ranking from "components/Ranking";
import SelectLanguage from "components/SelectLanguage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";
import { fetchRankings } from "services/rankings";

export default function Rankings() {
    const languages = useSelector(state => state.languages);
    const ranking = useSelector(state => state.ranking);
    const [language, setLanguage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        const defaultLanguage = (languages.length > 0)?languages[0].language_name:null;
        setLanguage(defaultLanguage);
    }, [languages]);
    
    useEffect(() => {
        if (language != null) {
            const payload = {
                language: language
            }
            dispatch(fetchRankings(payload));
        }
    }, [dispatch, language]);

    return (
        <>
            <h5 className="mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trophy" viewBox="0 0 16 16">
                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                </svg> <span>Rankings</span>
            </h5>
            <div className="mb-4">
                <SelectLanguage id="selectLanguage" name="language" items={languages} onClick={(value) => {
                    setLanguage(value);
                    const payload = {
                        language: value
                    }
                    dispatch(fetchRankings(payload));
                }}/>
            </div>
            <Ranking ranking={ranking}/>
            <Pagination 
                previous={ranking.previous} 
                next={ranking.next} 
                count={ranking.count} 
                resultsPerPage={10} 
                page={ranking.page} 
                callback={(page) => {
                    const payload = {
                        language: language,
                        page: page
                    }
                    dispatch(fetchRankings(payload));
                }}/>
        </>
    )
}