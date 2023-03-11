import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";
import FeedbackCard from "components/FeedbackCard";
import { Button, Form } from "react-bootstrap";
import LabeledInput from "components/LabeledInput";

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
            variant={(feedback.result?"success":"danger")}
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
        <Form className="text-center" onSubmit={
            (event) => {
                event.preventDefault();
                setFeedback({
                    result: null,
                    correct_answer: null,
                    state: "pending"
                });
                fetch(`${baseUrl}/conjugation-game`, {
                    method: "POST",
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
            <LabeledInput controlId="word" placeholder={`${verb.word} - ${verb.tense}`} disabled/>
            <LabeledInput controlId="conjugation1" label={language.personal_pronoun_1} 
                onChange={(event) => setConjugation({...conjugation, "conjugation_1": event.target.value})} />
            <LabeledInput controlId="conjugation2" label={language.personal_pronoun_2}
                onChange={(event) => setConjugation({...conjugation, "conjugation_2": event.target.value})}/>
            <LabeledInput controlId="conjugation3" label={language.personal_pronoun_3}
                onChange={(event) => setConjugation({...conjugation, "conjugation_3": event.target.value})}/>
            <LabeledInput controlId="conjugation4" label={language.personal_pronoun_4}
                onChange={(event) => setConjugation({...conjugation, "conjugation_4": event.target.value})}/>
            <LabeledInput controlId="conjugation5" label={language.personal_pronoun_5}
                onChange={(event) => setConjugation({...conjugation, "conjugation_5": event.target.value})}/>
            <LabeledInput controlId="conjugation6" label={language.personal_pronoun_6}
                onChange={(event) => setConjugation({...conjugation, "conjugation_6": event.target.value})}/>
            <div className="text-center">
                <Button variant="success" type="submit">Verify answer</Button>
            </div>
        </Form>
    );
}