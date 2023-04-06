import ListWords from "components/ListWords";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const user = useSelector(state => state.user);
    const [searchResults, setSearchResults] = useState({results: []});
    const getSearchResultsPage = useCallback((page) => {
        const url = `${baseUrl}/search?${searchParams}&page=${page}`;
        let options = {};

        if (user) {
            options = {
                headers: {
                    Authorization: `Token ${user.token}`,
                }
            };
        }

        fetch(url, options).then((response) => response.json()).then((data) => {
            data.page = page;
            setSearchResults(data);
        });
    }, [searchParams, user]);

    useEffect(() => {
        // Fetching results
        getSearchResultsPage(1);
    }, [user, searchParams, getSearchResultsPage]);

    return (    
        <>
            <h5 className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg> <span>Search results</span>
            </h5>
            <ListWords words={searchResults} callback={(page) => getSearchResultsPage(page)}/>
        </>
    );
}