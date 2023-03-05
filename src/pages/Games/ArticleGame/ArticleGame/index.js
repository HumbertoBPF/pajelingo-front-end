import Button from "components/Button";
import FeedbackCard from "components/FeedbackCard";
import Input from "components/Input";
import { useEffect, useState } from "react";
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
            colorStyle={(feedback.result?"success":"danger")}
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
        <form className="text-center" onSubmit={(event) => {
            event.preventDefault();
            setFeedback({
                result: null,
                correct_answer: null,
                state: "pending"
            });
            fetch(`${baseUrl}/article-game`, {
                method:"POST",
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
                <div className="col-4 col-lg-2">
                    <Input 
                        id="article" 
                        type="text" 
                        placeholder="Article" 
                        onChange={(value) => setAnswer(value)}
                        disabled={feedback.state !== "idle"}/>
                </div>
                <div className="col-8 col-lg-10">
                    <Input id="word" type="text" placeholder={word.word} disabled />
                </div>
            </div>
            <Button id="answerSubmitButton" colorStyle="success" type="submit">Verify answer</Button>
        </form>
    );
}