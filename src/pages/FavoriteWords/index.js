import HeartIcon from "components/HeartIcon";
import ListWords from "components/ListWords";
import NotificationToast from "components/NotificationToast";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "services/base";

export default function FavoriteWords() {
    const user = useSelector(state => state.user);
    const [favoriteWords, setFavoriteWords] = useState({results: []});
    const [showToast, setShowToast] = useState(false);
    const getSearchResultsPage = useCallback((page) => {
        if (user) {
            fetch(`${baseUrl}/words/favorite-words?page=${page}`, {
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
            }).catch(error => setShowToast(true));
        }
    }, [user]);

    useEffect(() => getSearchResultsPage(1), [getSearchResultsPage]);

    return (
        <>
            <h5 className="mb-4"><HeartIcon fill/> <span>Favorite words</span></h5>
            <ListWords words={favoriteWords} callback={(page) => getSearchResultsPage(page)}/>
            <NotificationToast 
                show={showToast} 
                onClose={() => setShowToast(false)} 
                variant="danger" 
                message="An error occurred when processing the request. Please try again."/>
        </>
    );
}