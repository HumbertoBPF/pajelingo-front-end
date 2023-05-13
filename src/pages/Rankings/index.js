import CustomSpinner from "components/CustomSpinner";
import PaginationBar from "components/PaginationBar";
import Ranking from "components/Ranking";
import SelectLanguage from "components/SelectLanguage";
import TropheeIcon from "components/icons/TropheeIcon";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "services/base";
import { fetchLanguages } from "services/languages";

export default function Rankings() {
    const languages = useSelector(state => state.languages);
    const user = useSelector(state => state.user);
    const [ranking, setRanking] = useState({results:[], page: 1});
    const [language, setLanguage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const getRankings = useCallback((language, page, user=null) => {
        if (language != null) {
            let url = `${baseUrl}/rankings?language=${language}&page=${page}`;

            if (user) {
                url += `&user=${user.username}`;
            }

            setIsLoading(true);

            fetch(url)
            .then(response => {
                if (response.ok){
                    return response.json();
                }

                throw Error();
            })
            .then((data) => {
                setRanking({...data, page: page});
                setTimeout(() => setIsLoading(false), 2000);
            }).catch(error => {
                setTimeout(() => setIsLoading(false), 2000);
            });
        }
    }, []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        if (languages.length > 0){
            setLanguage(languages[0].language_name);
        }
    }, [languages]);
    
    useEffect(() => getRankings(language, 1, user), [language, getRankings, user]);

    return (
        <>
            <h5 className="mb-4">
                <TropheeIcon /> <span>Rankings</span>
            </h5>
            <div className="mb-4">
                <SelectLanguage items={languages} onClick={(target) => setLanguage(target.value)}/>
            </div>
            {
                isLoading?
                <div className="text-center">
                    <CustomSpinner/>
                </div>:
                <Ranking ranking={ranking}/>
            }
            <PaginationBar 
                previous={ranking.previous} 
                next={ranking.next} 
                count={ranking.count} 
                resultsPerPage={10} 
                page={ranking.page} 
                callback={(page) => getRankings(language, page, user)}/>
        </>
    )
}