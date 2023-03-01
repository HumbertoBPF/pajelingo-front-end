import Pagination from "components/Pagination";
import SearchResultCard from "components/SearchResultCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const languages = useSelector(state => state.languages);
    const [searchResults, setSearchResults] = useState({results: []});
    const [languagesFlag, setLanguagesFlag] = useState(new Map());

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        // Preparing language map
        let temp = languagesFlag;
        temp.clear();
        languages.forEach(item => {
            temp.set(item.language_name, item.flag_image);
        });
        setLanguagesFlag(temp);
        // Fetching results
        const url = `http://localhost:8000/api/search?${searchParams}`;
        fetch(url).then((response) => response.json()).then((data) => {
            data.page = 1;
            setSearchResults(data);
        });
    }, [languages]);

    return (
        <>
            <div className="row justify-content-center mb-4">
                { searchResults.results.map((item) => <SearchResultCard 
                                                key={item.id} 
                                                word={item.word_name} 
                                                language={item.language} 
                                                flagImage={languagesFlag.get(item.language)}/>) }
            </div>
            <Pagination 
                    previous={searchResults.previous} 
                    next={searchResults.next} 
                    count={searchResults.count} 
                    resultsPerPage={12} 
                    page={searchResults.page} 
                    callback={(page) => {
                        const url = `http://localhost:8000/api/search?${searchParams}&page=${page}`;
                        fetch(url).then((response) => response.json()).then((data) => {
                            data.page = page;
                            setSearchResults(data);
                        });
                    }}/>
        </>
    );
}