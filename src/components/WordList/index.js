import PaginationBar from "components/PaginationBar";
import SearchResultCard from "components/SearchResultCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function WordList({ words, callback=((page) => {}) }) {
    const languages = useSelector(state => state.languages);
    const [languagesFlag, setLanguagesFlag] = useState(new Map());

    useEffect(() => {
        // Preparing language map
        let temp = new Map();
        languages.forEach(item => {
            temp.set(item.language_name, item.flag_image);
        });
        setLanguagesFlag(temp);
    }, [languages])

    return (    
        (words.count === 0)?
        <div className="row justify-content-center">
            <div className="text-center col-sm-8 col-md-4">
                <img id="noResultImg" src="/images/no_result.jpg" className="img-fluid rounded" alt="No results"/>
                <p>No result matching your search was found</p>
            </div>
        </div>:
        <>
            <div className="row justify-content-center">
                {words.results.map((word) => <SearchResultCard 
                                                key={word.id} 
                                                word={word}
                                                flagImage={languagesFlag.get(word.language)}/>)}
            </div>
            <PaginationBar 
                previous={words.previous} 
                next={words.next} 
                count={words.count} 
                resultsPerPage={12} 
                page={words.page} 
                callback={(page) => callback(page)}/> 
        </>
    );
}