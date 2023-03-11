import FeedbackCard from "components/FeedbackCard";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function ArticleGame() {
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
        fetch(`${baseUrl}/article-game?${searchParams}`)
            .then((response) => response.json())
            .then((data) => setWord(data));
    }, [searchParams]);

    return (
        (feedback.state === "succeeded")?
        <FeedbackCard 
            variant={(feedback.result?"success":"danger")}
            onClick={(event) => {
                fetch(`${baseUrl}/article-game?${searchParams}`)
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
        <Form className="text-center" onSubmit={(event) => {
            event.preventDefault();
            setFeedback({
                result: null,
                correct_answer: null,
                state: "pending"
            });
            fetch(`${baseUrl}/article-game`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "word_id": word.id,
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
            <div className="mb-4 row">
                <Form.Group className="col-4 col-lg-2" controlId="articleInput">
                    <Form.Control className="text-center mb-4" type="text" placeholder="Article" 
                        onChange={(event) => setAnswer(event.target.value)} />
                </Form.Group>
                <Form.Group className="col-8 col-lg-10" controlId="wordInput">
                    <Form.Control className="text-center mb-4" type="text" placeholder={word.word} disabled />
                </Form.Group>
            </div>
            <div className="text-center">
                <Button variant="success" type="submit">Verify answer</Button>
            </div>
        </Form>
    );
}