import FeedbackCard from "components/FeedbackCard";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function VocabularyGame(){
    const [searchParams] = useSearchParams();
    const [word, setWord] = useState({
        id: null,
        word: ""
    });
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState({
        result: null,
        correct_answer:null,
        state: "idle"
    });

    useEffect(() => {
        const queryParams = new URLSearchParams({
            language: searchParams.get("target_language")
        });
        fetch(`${baseUrl}/vocabulary-game?${queryParams}`).then((data) => data.json()).then((data) => setWord(data));
    }, [searchParams]);

    return (
        (feedback.state === "succeeded")?
        <FeedbackCard
            variant={(feedback.result?"success":"danger")}
            onClick={(event) => {
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
                                state: "idle"
                            });
                    });
            }}>
                {`${feedback.result?"Correct answer :)":"Wrong answer"}`}
                <br/>
                {feedback.correct_answer}
        </FeedbackCard>:
        <form 
            className="text-center" 
            onSubmit={(event) => {
                event.preventDefault();
                setFeedback({
                    result: null,
                    correct_answer: null,
                    state: "pending"
                });
                fetch(`${baseUrl}/vocabulary-game`, {
                    method: "POST",
                    headers: {
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
                        state: "succeeded"
                    });
                })
            }}>
            <Form.Group className="text-center mb-4" controlId="wordInput">
                <Form.Control type="text" placeholder={word.word} disabled />
            </Form.Group>
            <Form.Group className="text-center mb-4" controlId="answerInput">
                <Form.Control type="text" placeholder={`Provide the translation in ${searchParams.get("base_language")}`} 
                    onChange={(event) => setAnswer(event.target.value)}/>
            </Form.Group>
            <div className="text-center">
                <Button variant="success" type="submit">Verify answer</Button>
            </div>
        </form>
    );
}