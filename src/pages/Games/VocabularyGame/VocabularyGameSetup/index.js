import CustomizedButton from "components/CustomizedButton";
import NotificationToast from "components/NotificationToast";
import SelectLanguage from "components/SelectLanguage";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function VocabularyGameSetup() {
    let languages = useSelector(state => state.languages);
    const [error, setError] = useState({
        showToast: false,
        message: ""
    });
    const dispatch = useDispatch();
    const [baseLanguage, setBaseLanguage] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState(null);
    const navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault();

        if ((baseLanguage === null) || (baseLanguage === "") || (targetLanguage === null) || (targetLanguage === "")) {
            setError({
                showToast: true,
                message: "You must set both base and target languages."
            });
            return;
        }

        if (baseLanguage === targetLanguage) {
            setError({
                showToast: true,
                message: "Base and target languages must be different."
            });
            return;
        }

        const queryParams = new URLSearchParams({
            base_language: baseLanguage,
            target_language: targetLanguage
        });
        navigate(`/vocabulary-game/play?${queryParams}`);
    }

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
            <Form onSubmit={(event) => handleFormSubmit(event)}>
                <SelectLanguage items={languages} defaultItem="Choose a base language"
                    onClick={(target) => setBaseLanguage(target.value)}/>
                <SelectLanguage items={languages} defaultItem="Choose a target language"
                    onClick={(target) => setTargetLanguage(target.value)}/>
                <div className="text-center">
                    <CustomizedButton variant="success" type="submit">Start</CustomizedButton>
                </div>
            </Form>
            <NotificationToast 
                show={error.showToast} 
                onClose={() => setError({...error, showToast: false})} 
                variant="danger" 
                message={error.message}/>
        </>
    )
}