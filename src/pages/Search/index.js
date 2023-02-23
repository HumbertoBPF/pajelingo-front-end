import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Input from "components/Input";
import { useEffect, useState } from "react";
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
            <Input 
                id="searchInput" 
                type="search" 
                name="search" 
                label="Search for..." 
                onChange={(target) => {
                    console.log(target.value);
                    setSearchPattern(target.value);  
                }}/>
            {languages.map(item => <Checkbox 
                                        key={item.id} 
                                        id={item.id} 
                                        value={item.language_name}
                                        onChange={
                                            (target) => {
                                                if (target.checked) {
                                                    console.log([...languagesSelected, target.value]);
                                                    setLanguagesSelected([...languagesSelected, target.value]);
                                                }else {
                                                    setLanguagesSelected(languagesSelected.filter((value) => {
                                                        return (value !== target.value);
                                                    }));
                                                }
                                            }
                                        }
                                        >{item.language_name}</Checkbox>)}
            <Button id="searchSubmitButton" colorStyle="success" type="submit">Search</Button>
        </form>
    )
}