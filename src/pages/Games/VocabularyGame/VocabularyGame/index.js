import Button from "components/Button";
import GameInput from "components/GameInput";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function VocabularyGame(){
    const [searchParams] = useSearchParams();
    const [word, setWord] = useState({
        id: null,
        word: ""
    });

    useEffect(() => {
        console.log(searchParams);
        const queryParams = new URLSearchParams({
            language: searchParams.get("target_language")
        });
        fetch(`${baseUrl}/vocabulary-game?${queryParams}`).then((data) => data.json()).then((data) => setWord(data));
    }, [searchParams]);

    return (
        <form className="text-center">
            <GameInput id="wordToTranslate" type="text" placeholder={word.word} disabled/>
            <GameInput id="translationWord" type="text" placeholder={`Provide the translation in ${searchParams.get("base_language")}`}/>
            <Button id="answerSubmitButton" colorStyle="success" type="submit">Verify answer</Button>
        </form>
    );
}