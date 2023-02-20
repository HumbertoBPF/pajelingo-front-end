import Button from "components/Button";
import SelectLanguage from "components/SelectLanguage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";

export default function VocabularyGameSetup() {
    let languages = useSelector(state => state.languages);
    const dispatch = useDispatch();

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
            <form action="{% url 'vocabulary-game' %}" method="GET">
                <div class="mb-4">
                    <SelectLanguage id="selectBaseLanguage" name="base_language" items={languages} defaultItem="Choose a base language"/>
                </div>
                <div class="mb-4">
                    <SelectLanguage id="selectTargetLanguage" name="target_language" items={languages} defaultItem="Choose a target language"/>
                </div>
                <Button id="submitButtonSetupForm" colorStyle="success" type="submit">Start</Button>
            </form>
        </>
    )
}