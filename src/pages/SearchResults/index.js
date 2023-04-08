import WordListWithFilters from "components/WordListWithFilters";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "services/base";

export default function SearchResults() {
    const user = useSelector(state => state.user);
    const [words, setWords] = useState({results: []});
    const [isFiltering, setIsFiltering] = useState(false);
    const [isPaginating, setIsPaginating] = useState(false);

    const getSearchResultsPage = useCallback((searchPattern, languages, page) => {
        let searchFilters = {
            "search": searchPattern,
            "page": page
        }

        languages.forEach((value, key) => {
            searchFilters[key] = value; 
        })
        
        const queryParams = new URLSearchParams(searchFilters);

        let options = {};

        if (user) {
            options = {
                headers: {
                    Authorization: `Token ${user.token}`,
                }
            };
        }

        fetch(`${baseUrl}/search?${queryParams}`, options)
        .then((response) => response.json())
        .then((data) => {
            data.page = page;
            setWords(data);
            setTimeout(() => {
                setIsFiltering(false);
                setIsPaginating(false);
            }, 2000);
        });
    }, [user]);

    const filterCallback = useCallback((searchPattern, languages) => {
        setIsFiltering(true);
        getSearchResultsPage(searchPattern, languages, 1);
    }, [getSearchResultsPage]);

    const paginationCallback = useCallback((searchPattern, languages, page) => {
        setIsPaginating(true);
        getSearchResultsPage(searchPattern, languages, page);
    }, [getSearchResultsPage]);

    return (    
        <>
            <h5 className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg> <span>Search results</span>
            </h5>
            <WordListWithFilters 
                words={words} 
                isFiltering={isFiltering}
                isPaginating={isPaginating}
                filterCallback={filterCallback} 
                paginationCallback={paginationCallback}/>
        </>
    );
}