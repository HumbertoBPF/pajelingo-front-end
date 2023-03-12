import CustomizedButton from "components/CustomizedButton";
import SelectLanguage from "components/SelectLanguage";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLanguages } from "services/languages";

export default function ConjugationGameSetup() {
    let languages = useSelector(state => state.languages);
    const dispatch = useDispatch();
    const [language, setLanguage] = useState(null);
    const navigate = useNavigate();

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
            <Form onSubmit={(event) => {
                event.preventDefault();
                const queryParams = new URLSearchParams({
                    language: language
                })
                navigate(`/conjugation-game/play?${queryParams}`);
            }}>
                <div className="mb-4">
                    <SelectLanguage items={languages} defaultItem="Choose a language"
                        onClick={(target) => setLanguage(target.value)}/>
                </div>
                <div className="text-center">
                    <CustomizedButton variant="success" type="submit">Start</CustomizedButton>
                </div>
            </Form>
        </>
    )
}