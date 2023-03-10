import Checkbox from "components/Checkbox";
import FloatingLabelInput from "components/FloatingLabeledInput";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function Search() {
    const languages = useSelector(state => state.languages);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const [searchPattern, setSearchPattern] = useState("");
    const [languagesSelected, setLanguagesSelected] = useState([]);

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    return (
        <form method="GET" onSubmit={
            (event) => {
                event.preventDefault();
                let searchFilters = {
                    "search": searchPattern
                }

                languagesSelected.forEach((language) => {
                    searchFilters[language] = true; 
                })
                
                const baseUrl = "/search-results";
                const queryParams = new URLSearchParams(searchFilters);
                navigator(`${baseUrl}?${queryParams}`);
            }
        }>
            <FloatingLabelInput id="searchInput" type="search" name="search" label="Search for..." 
                onChange={(target) => {
                    setSearchPattern(target.value);  
                }}/>
            {languages.map(item => <Checkbox key={item.id} id={item.id} value={item.language_name}
                                        onChange={
                                            (target) => {
                                                if (target.checked) {
                                                    setLanguagesSelected([...languagesSelected, target.value]);
                                                }else {
                                                    setLanguagesSelected(languagesSelected.filter((item) => {
                                                        return (item !== target.value);
                                                    }));
                                                }
                                            }
                                        }
                                        >{item.language_name}</Checkbox>)}
            <div className="text-center">
                <Button variant="success" type="submit">Search</Button>
            </div>
        </form>
    )
}