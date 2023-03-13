import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";
import FeedbackCard from "components/FeedbackCard";
import { Form } from "react-bootstrap";
import LabeledInput from "components/LabeledInput";
import CustomizedButton from "components/CustomizedButton";

export default function ConjugationGame() {
    const [searchParams] = useSearchParams();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
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
        score: null,
        state: "idle"
    });
    const navigate = useNavigate();
    const playAgain = useCallback(() => {
        fetch(`${baseUrl}/conjugation-game?${searchParams}`)
            .then((response) => {
                if (response.status === 404) {
                    navigate("/conjugation-game/setup");
                    return;
                }

                return response.json();
            })
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
                    score: null,
                    state: "idle"
                });
            });
    }, [searchParams, navigate]);

    function handleFormSubmit(event) {
        event.preventDefault();
        
        setFeedback({
            result: null,
            correct_answer: null,
            score: null,
            state: "pending"
        });

        let authHeaders = {}

        if (user) {
            authHeaders["Authorization"] = `Token ${user.token}`;
        }

        fetch(`${baseUrl}/conjugation-game`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeaders
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
                score: data.score,
                state: "succeeded"
            });
        });
    }

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    useEffect(() => {
        languages.forEach(item => {
            if (item.language_name === searchParams.get("language")){
                setLanguage(item);
            }
        });
        playAgain();
    }, [playAgain, searchParams, languages]);

    return (
        (feedback.state === "succeeded")?
        <FeedbackCard variant={(feedback.result?"success":"danger")} onClick={() => playAgain()}>
                {`${feedback.result?"Correct answer :)":"Wrong answer"}`}
                <br/>
                {feedback.correct_answer.split("\n").map(
                    (item, index) => ((index === 5)?
                        <span key={index}>{item}</span>:
                        <span key={index}>{item}<br/></span>))}
                {(feedback.score)?`Your score is ${feedback.score}`:null}
        </FeedbackCard>:
        <Form className="text-center" onSubmit={(event) => handleFormSubmit(event)}>  
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
                <CustomizedButton variant="success" type="submit">Verify answer</CustomizedButton>
            </div>
        </Form>
    );
}