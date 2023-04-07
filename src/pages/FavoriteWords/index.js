import WordListWithFilters from "components/WordListWithFilters";
import HeartIcon from "components/HeartIcon";
import NotificationToast from "components/NotificationToast";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "services/base";

export default function FavoriteWords() {
    const user = useSelector(state => state.user);

    const [favoriteWords, setFavoriteWords] = useState({results: []});
    const [showToast, setShowToast] = useState(false);
    
    const getSearchResultsPage = useCallback((searchPattern, languages, page) => {
        if (user) {
            let searchFilters = {
                "search": searchPattern,
                "page": page
            }

            languages.forEach((value, key) => {
                searchFilters[key] = value; 
            })
            
            const queryParams = new URLSearchParams(searchFilters);

            fetch(`${baseUrl}/words/favorite-words?${queryParams}`, {
                headers: {
                    Authorization: `Token ${user.token}`,
                }
            }).then(response => {
                if (response.ok){
                    return response.json();
                }

                throw Error();
            }).then(data => {
                data.page = page;
                setFavoriteWords(data);
                console.log(data);
            }).catch(error => setShowToast(true));
        }
    }, [user]);

    return (
        <>
            <h5 className="mb-4"><HeartIcon fill/> <span>Favorite words</span></h5>
            <WordListWithFilters 
                words={favoriteWords} 
                filterCallback={getSearchResultsPage}/>
            <NotificationToast 
                show={showToast} 
                onClose={() => setShowToast(false)} 
                variant="danger" 
                message="An error occurred when processing the request. Please try again."/>
        </>
    );
}