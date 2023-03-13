import CustomizedButton from "components/CustomizedButton";
import NotificationToast from "components/NotificationToast";
import SelectLanguage from "components/SelectLanguage";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function ArticleGameSetup() {
    let languages = useSelector(state => state.languages);
    const [error, setError] = useState({
        showToast: false,
        message: ""
    });
    const dispatch = useDispatch();
    const [language, setLanguage] = useState(null);
    const navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault();

        if (language === null) {
            setError({showToast: true, message: "You must choose a language."});
            return;
        }

        const queryParams = new URLSearchParams({
            language: language
        });
        navigate(`/article-game/play?${queryParams}`);
    }

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
            <Form onSubmit={(event) => handleFormSubmit(event)}>
                <SelectLanguage items={languages} defaultItem="Choose a language"
                    onClick={(target) => setLanguage(target.value)}/>
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