import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Input from "components/Input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";

export default function Search() {
    const languages = useSelector(state => state.languages);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    return (
        <form action="{% url 'search-done' %}" method="GET">
            <Input id="searchInput" type="search" name="search">Search for...</Input>
            {languages.map(item => <Checkbox key={item.id} id={item.id} value={item.language_name}>{item.language_name}</Checkbox>)}
            <Button id="searchSubmitButton" colorStyle="success" type="submit">Search</Button>
        </form>
    )
}