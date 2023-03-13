import CustomizedButton from "components/CustomizedButton";
import FeedbackCard from "components/FeedbackCard";
import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function ArticleGame() {
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
    const navigate = useNavigate();
    const playAgain = useCallback(() => {
        fetch(`${baseUrl}/article-game?${searchParams}`)
        .then((response) => {
            if (response.status === 404) {
                navigate("/article-game/setup");
                return;
            }

            return response.json();
        })
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

        fetch(`${baseUrl}/article-game`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeaders
            },
            body: JSON.stringify({
                "word_id": word.id,
                "answer": answer
            })
        })
        .then((response) => response.json())
        .then((data) => {
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
            {feedback.correct_answer}
            <br/>
            {(feedback.score)?`Your score is ${feedback.score}`:null}
        </FeedbackCard>:
        <Form className="text-center" onSubmit={(event) => handleFormSubmit(event)}>
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
                <CustomizedButton variant="success" type="submit">Verify answer</CustomizedButton>
            </div>
        </Form>
    );
}