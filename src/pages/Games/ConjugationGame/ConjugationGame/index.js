import Button from "components/Button";
import LabeledInput from "components/LabeledInput";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";
import FeedbackCard from "components/FeedbackCard";

export default function ConjugationGame() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [verb, setVerb] = useState({
        id: null,
        word: "",
        tense: ""
    });
    const [language, setLanguage] = useState({});
    const languages = useSelector(state => state.languages);
    const [conjugation, setConjugation] = useState({
        "conjugation_1":"", 
        "conjugation_2":"", 
        "conjugation_3":"", 
        "conjugation_4":"", 
        "conjugation_5":"", 
        "conjugation_6":""
    });
    const [feedback, setFeedback] = useState({
        result: null,
        correct_answer:null,
        state: "idle"
    });

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        languages.forEach(item => {
            if (item.language_name === searchParams.get("language")){
                setLanguage(item);
            }
        });
        fetch(`${baseUrl}/conjugation-game?${searchParams}`)
            .then((response) => response.json())
            .then((data) => setVerb(data));
    }, [searchParams, languages]);

    return (
        (feedback.state === "succeeded")?
        <FeedbackCard 
            colorStyle={(feedback.result?"success":"danger")}
            onClick={(event) => {
                fetch(`${baseUrl}/conjugation-game?${searchParams}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setVerb(data);
                        setConjugation({
                            "conjugation_1":"", 
                            "conjugation_2":"", 
                            "conjugation_3":"", 
                            "conjugation_4":"", 
                            "conjugation_5":"", 
                            "conjugation_6":""
                        });
                        setFeedback({
                                result: null,
                                correct_answer:null,
                                state: "idle"
                            });
                    });
            }}>
                {`${feedback.result?"Correct answer :)":"Wrong answer"}`}
                <br/>
                {feedback.correct_answer.split("\n").map(
                    (item, index) => ((index === 5)?
                        <span key={index}>{item}</span>:
                        <span key={index}>{item}<br/></span>))}
        </FeedbackCard>:
        <form className="text-center" onSubmit={
            (event) => {
                event.preventDefault();
                setFeedback({
                    result: null,
                    correct_answer: null,
                    state: "pending"
                });
                fetch(`${baseUrl}/conjugation-game`, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "word_id": verb.id,
                        "tense": verb.tense,
                        ...conjugation   
                    })
                }).then((response) => response.json()).then((data) => {
                    setFeedback({
                        result: data.result,
                        correct_answer: data.correct_answer,
                        state: "succeeded"
                    });
                })
            }
        }>
            <LabeledInput id="word" name="word" type="text" label="" disabled placeholder={`${verb.word} - ${verb.tense}`}/>
            <LabeledInput 
                id="conjugation_1" 
                name="conjugation_1" 
                type="text" 
                label={language.personal_pronoun_1}
                onChange={(value) => setConjugation({...conjugation, "conjugation_1": value})}/>
            <LabeledInput 
                id="conjugation_2" 
                name="conjugation_2" 
                type="text" 
                label={language.personal_pronoun_2}
                onChange={(value) => setConjugation({...conjugation, "conjugation_2": value})}/>
            <LabeledInput 
                id="conjugation_3" 
                name="conjugation_3" 
                type="text" 
                label={language.personal_pronoun_3}
                onChange={(value) => setConjugation({...conjugation, "conjugation_3": value})}/>
            <LabeledInput 
                id="conjugation_4" 
                name="conjugation_4" 
                type="text" 
                label={language.personal_pronoun_4}
                onChange={(value) => setConjugation({...conjugation, "conjugation_4": value})}/>
            <LabeledInput 
                id="conjugation_5" 
                name="conjugation_5" 
                type="text" 
                label={language.personal_pronoun_5}
                onChange={(value) => setConjugation({...conjugation, "conjugation_5": value})}/>
            <LabeledInput 
                id="conjugation_6" 
                name="conjugation_6" 
                type="text" 
                label={language.personal_pronoun_6}
                onChange={(value) => setConjugation({...conjugation, "conjugation_6": value})}/>
            <div className="text-center">
                <Button id="answerSubmitButton" colorStyle="success" type="submit">Verify answer</Button>
            </div>
        </form>
    );
}