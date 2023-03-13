import CustomizedButton from "components/CustomizedButton";
import FeedbackCard from "components/FeedbackCard";
import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function VocabularyGame(){
    const [searchParams] = useSearchParams();
    const user = useSelector(state => state.user);
    const [word, setWord] = useState({
        id: null,
        word: ""
    });
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState({
        result: null,
        correct_answer:null,
        score: null,
        state: "idle"
    });
    const playAgain = useCallback(() => {
        const queryParams = new URLSearchParams({
            language: searchParams.get("target_language")
        });
        fetch(`${baseUrl}/vocabulary-game?${queryParams}`)
        .then((response) => response.json())
        .then((data) => {
            setWord(data);
            setAnswer("");
            setFeedback({
                result: null,
                correct_answer:null,
                score: null,
                state: "idle"
            });
        });
    }, [searchParams]);

    function handleFormSubmit(event) {
        event.preventDefault();

        let authHeaders = {}

        if (user) {
            authHeaders["Authorization"] = `Token ${user.token}`;
        }

        setFeedback({
            result: null,
            correct_answer: null,
            score: null,
            state: "pending"
        });

        fetch(`${baseUrl}/vocabulary-game`, {
            method: "POST",
            headers: {
                ...authHeaders,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "word_id": word.id,
                "base_language": searchParams.get("base_language"),
                "answer": answer
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

    useEffect(() => playAgain(), [playAgain]);

    return (
        (feedback.state === "succeeded")?
        <FeedbackCard variant={(feedback.result?"success":"danger")} onClick={() => playAgain()}>
            {`${feedback.result?"Correct answer :)":"Wrong answer"}`}
            <br/>
            {`${word.word}: ${feedback.correct_answer}`}
            <br/>
            {(feedback.score)?`Your score is ${feedback.score}`:null}
        </FeedbackCard>:
        <Form className="text-center" onSubmit={(event) => handleFormSubmit(event)}>
            <Form.Group className="mb-4" controlId="wordInput">
                <Form.Control className="text-center" type="text" placeholder={word.word} disabled />
            </Form.Group>
            <Form.Group className="mb-4" controlId="answerInput">
                <Form.Control className="text-center" type="text" placeholder={`Provide the translation in ${searchParams.get("base_language")}`} 
                    onChange={(event) => setAnswer(event.target.value)}/>
            </Form.Group>
            <div className="text-center">
                <CustomizedButton variant="success" type="submit">Verify answer</CustomizedButton>
            </div>
        </Form>
    );
}