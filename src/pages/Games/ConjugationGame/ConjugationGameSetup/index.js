import Button from "components/Button";
import SelectLanguage from "components/SelectLanguage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";

export default function ConjugationGameSetup() {
    let languages = useSelector(state => state.languages);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    return (
        <>
            <h5>Conjugation game</h5>
            <br/>
            <section>
                <p>A key part of learning a language is about conjugating verbs. Some languages have tenses that are not present in other
                    ones. The conjugation of regular verbs is determined by some rules. On the other hand, irregular verbs are a bit random,
                    but there are still some patterns that can be identified. The common point between all tenses and kind of verbs is that
                    mastering them requires practice, so let’s start! </p>
            </section>
            <form action="{% url 'conjugation-game' %}" method="GET">
                <div className="mb-4">
                    <SelectLanguage id="selectLanguage" name="language" items={languages} defaultItem="Choose a language"/>
                </div>
                <Button id="submitButtonSetupForm" colorStyle="success" type="submit">Start</Button>
            </form>
        </>
    )
}