import Button from "components/Button";
import GameInput from "components/GameInput";
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

    useEffect(() => {
        console.log(searchParams);
        fetch(`${baseUrl}/article-game?${searchParams}`).then((response) => response.json()).then((data) => setWord(data));
    }, [searchParams]);

    return (
        <form className="text-center" onSubmit={(event) => {
            event.preventDefault();
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
                console.log(data.result);
                console.log(data.correct_answer);
            })
        }}>
            <div className="mb-4 row">
                <div className="col-4 col-lg-2">
                    <GameInput id="article" type="text" placeholder="Article" onChange={(value) => setAnswer(value)}/>
                </div>
                <div className="col-8 col-lg-10">
                    <GameInput id="word" type="text" placeholder={word.word} disabled />
                </div>
            </div>
            <Button id="answerSubmitButton" colorStyle="success" type="submit">Verify answer</Button>
        </form>
    );
}