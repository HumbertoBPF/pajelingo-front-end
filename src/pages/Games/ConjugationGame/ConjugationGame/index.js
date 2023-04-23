import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "services/languages";
import FeedbackCard from "components/FeedbackCard";
import { Form } from "react-bootstrap";
import LabeledInput from "components/LabeledInput";
import CustomButton from "components/CustomButton";
import useGame from "hooks/useGame";
import CustomSpinner from "components/CustomSpinner";

export default function ConjugationGame() {
    const user = useSelector(state => state.user);
    const languages = useSelector(state => state.languages);
    const [conjugationGame] = useGame(3);

    const [searchParams] = useSearchParams();

    const [verb, setVerb] = useState({
        id: null,
        word: "",
        tense: ""
    });
    const [language, setLanguage] = useState({});
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
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const playAgain = useCallback(() => {
        if (conjugationGame.link) {
            let authHeaders = {}

            if (user) {
                authHeaders["Authorization"] = `Token ${user.token}`;
            }

            fetch(`${baseUrl}/conjugation-game?${searchParams}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders
                }  
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                navigate(`${conjugationGame.link}setup`);
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
        }
    }, [searchParams, navigate, conjugationGame.link, user]);

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
                playAgain();
            }
        });
    }, [playAgain, searchParams, languages]);
    
    return (
        <>
            {
                (Object.keys(conjugationGame).length === 0)?
                <div className="text-center">
                    <CustomSpinner/>
                </div>:
                (feedback.state === "succeeded")?
                <FeedbackCard variant={(feedback.result?"success":"danger")} onClick={playAgain}>
                        {`${feedback.result?"Correct answer :)":"Wrong answer"}`}
                        <br/>
                        {feedback.correct_answer.split("\n").map(
                            (item, index) => ((index === 5)?
                                <span key={index}>{item}</span>:
                                <span key={index}>{item}<br/></span>))}
                        {(feedback.score)?`Your score is ${feedback.score}`:null}
                </FeedbackCard>:
                <Form className="text-center" onSubmit={(event) => handleFormSubmit(event)}>  
                    <LabeledInput controlId="word" type="text" label="" placeholder={`${verb.word} - ${verb.tense}`} disabled/>
                    <LabeledInput controlId="conjugation1" type="text" label={language.personal_pronoun_1} 
                        onChange={(event) => setConjugation({...conjugation, "conjugation_1": event.target.value})} />
                    <LabeledInput controlId="conjugation2" type="text" label={language.personal_pronoun_2}
                        onChange={(event) => setConjugation({...conjugation, "conjugation_2": event.target.value})}/>
                    <LabeledInput controlId="conjugation3" type="text" label={language.personal_pronoun_3}
                        onChange={(event) => setConjugation({...conjugation, "conjugation_3": event.target.value})}/>
                    <LabeledInput controlId="conjugation4" type="text" label={language.personal_pronoun_4}
                        onChange={(event) => setConjugation({...conjugation, "conjugation_4": event.target.value})}/>
                    <LabeledInput controlId="conjugation5" type="text" label={language.personal_pronoun_5}
                        onChange={(event) => setConjugation({...conjugation, "conjugation_5": event.target.value})}/>
                    <LabeledInput controlId="conjugation6" type="text" label={language.personal_pronoun_6}
                        onChange={(event) => setConjugation({...conjugation, "conjugation_6": event.target.value})}/>
                    <div className="text-center">
                        <CustomButton variant="success" type="submit">Verify answer</CustomButton>
                    </div>
                </Form>
            }
        </>
    );
}