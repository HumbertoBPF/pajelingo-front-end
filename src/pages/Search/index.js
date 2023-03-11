import FloatingLabelInput from "components/FloatingLabelInput";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
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
        <Form method="GET" onSubmit={
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
            <FloatingLabelInput controlId="floatingSearch" type="text" 
                label="Search for..." placeholder="Search for..." onChange={(event) => setSearchPattern(event.target.value)}/>
            {languages.map(item => <Form.Check key={item.id} id={item.id} value={item.language_name} 
                                    type="checkbox" label={item.language_name} 
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setLanguagesSelected([...languagesSelected, event.target.value]);
                                        }else {
                                            setLanguagesSelected(languagesSelected.filter((item) => {
                                                return (item !== event.target.value);
                                            }));
                                        }
                                    }}/>)}
            <div className="text-center">
                <Button variant="success" type="submit">Search</Button>
            </div>
        </Form>
    )
}