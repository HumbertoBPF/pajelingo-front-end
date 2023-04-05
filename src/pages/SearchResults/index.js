import PaginationBar from "components/PaginationBar";
import SearchResultCard from "components/SearchResultCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";
import { fetchLanguages } from "services/languages";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const languages = useSelector(state => state.languages);
    const [searchResults, setSearchResults] = useState({results: []});
    const [languagesFlag, setLanguagesFlag] = useState(new Map());

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);


    useEffect(() => {
        // Preparing language map
        let temp = new Map();
        languages.forEach(item => {
            temp.set(item.language_name, item.flag_image);
        });
        setLanguagesFlag(temp);
    }, [languages])

    useEffect(() => {
        // Fetching results
        const url = `${baseUrl}/search?${searchParams}`;
        let options = {}

        if (user) {
            options = {
                headers: {
                    Authorization: `Token ${user.token}`,
                }
            };
        }

        fetch(url, options).then((response) => response.json()).then((data) => {
            data.page = 1;
            setSearchResults(data);
        });
    }, [user, searchParams]);

    return (    
        (searchResults.count === 0)?
        <div className="row justify-content-center">
            <div className="text-center col-sm-8 col-md-4">
                <img id="noResultImg" src="/images/no_result.jpg" className="img-fluid rounded" alt="No results"/>
                <p>No result matching your search was found</p>
            </div>
        </div>:
        <>
            <div className="row justify-content-center">
                {searchResults.results.map((item) => <SearchResultCard 
                                                        key={item.id} 
                                                        word={item}
                                                        flagImage={languagesFlag.get(item.language)}/>)}
            </div>
            <PaginationBar 
                previous={searchResults.previous} 
                next={searchResults.next} 
                count={searchResults.count} 
                resultsPerPage={12} 
                page={searchResults.page} 
                callback={(page) => {
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
                }}/> 
        </>
    );
}