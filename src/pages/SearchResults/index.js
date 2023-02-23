import SearchResultCard from "components/SearchResultCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const languages = useSelector(state => state.languages);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        const url = `http://localhost:8000/api/search?${searchParams}`;
        fetch(url).then((response) => response.json()).then((data) => setSearchResults(data.results));
    }, [languages]);

    return (
        <div className="row justify-content-center">
            { searchResults.map((item) => <SearchResultCard 
                                            key={item.id} 
                                            word={item.word_name} 
                                            language={item.language} 
                                            flagImage=""/>) }
        </div>
    );
}