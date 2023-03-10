import SelectLanguage from "components/SelectLanguage";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function VocabularyGameSetup() {
    let languages = useSelector(state => state.languages);
    const dispatch = useDispatch();
    const [baseLanguage, setBaseLanguage] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    return (
        <>
            <h5>Vocabulary training</h5>
            <br/>
            <section>
                <p>This game will test your vocabulary. </p>

                <p>When learning a language, it is tricky to increase your repertory. For languages
                    different from the languages that you know, everything may seem random and unexpected. Even languages that share similarities,
                    such as Spanish and Portuguese, there are several “false friends”, that is words that seem to be a synonym of a word
                    in other language, but whose meaning is not the same. Let’s start?</p>
            </section>
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(baseLanguage);
                console.log(targetLanguage);
                const queryParams = new URLSearchParams({
                    base_language: baseLanguage,
                    target_language: targetLanguage
                });
                navigate(`/vocabulary-game/play?${queryParams}`);
            }}>
                <div className="mb-4">
                    <SelectLanguage 
                        id="selectBaseLanguage" 
                        name="base_language" 
                        items={languages} 
                        defaultItem="Choose a base language"
                        onClick={(target) => setBaseLanguage(target.value)}/>
                </div>
                <div className="mb-4">
                    <SelectLanguage 
                        id="selectTargetLanguage" 
                        name="target_language" 
                        items={languages} 
                        defaultItem="Choose a target language"
                        onClick={(target) => setTargetLanguage(target.value)}/>
                </div>
                <div className="text-center">
                    <Button variant="success" type="submit">Start</Button>
                </div>
            </form>
        </>
    )
}