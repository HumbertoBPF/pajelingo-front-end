import SelectLanguage from "components/SelectLanguage";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function ArticleGameSetup() {
    let languages = useSelector(state => state.languages);
    const dispatch = useDispatch();
    const [language, setLanguage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    languages = languages.filter(item => item.language_name !== "English");

    return (
        <>
            <h5>Guess the article</h5>
            <br/>
            <section>
                <p>As you may have inferred, in this game you must write the definite article that matches the displayed word. The
                    English language is not available for this game since there is only one definite article for this language (the). </p>

                <p>For the languages concerned by this game, the article indicates the gender and the number of the word. This might be
                    a bit weird for English speakers, but it’s just about getting used. Let’s start?</p>
            </section>
            <form onSubmit={(event) => {
                event.preventDefault();
                const queryParams = new URLSearchParams({
                    language: language
                })
                navigate(`/article-game/play?${queryParams}`);
            }}>
                <div className="mb-4">
                    <SelectLanguage 
                        id="selectLanguage" 
                        name="language" 
                        items={languages} 
                        defaultItem="Choose a language"
                        onClick={(target) => setLanguage(target.value)}/>
                </div>
                <div className="text-center">
                    <Button variant="success" type="submit">Start</Button>
                </div>
            </form>
        </>
    )
}