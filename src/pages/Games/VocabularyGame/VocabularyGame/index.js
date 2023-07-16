import { setupVocabularyGame, submitAnswerVocabularyGame } from "api/games";
import CustomButton from "components/CustomButton";
import CustomSpinner from "components/CustomSpinner";
import useGame from "hooks/useGame";
import FeedbackPage from "pages/FeedbackPage";
import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VocabularyGame() {
  const user = useSelector((state) => state.user);
  const [vocabularyGame] = useGame(1);

  const [searchParams] = useSearchParams();

  const [word, setWord] = useState({
    id: null,
    word: ""
  });
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState({
    result: null,
    correct_answer: null,
    score: null,
    new_badges: [],
    state: "idle"
  });

  const navigate = useNavigate();

  const playAgain = useCallback(() => {
    if (vocabularyGame.link) {
      const queryParams = new URLSearchParams({
        base_language: searchParams.get("base_language"),
        target_language: searchParams.get("target_language")
      });

      const token = user ? user.token : null;
      setupVocabularyGame(
        token,
        queryParams,
        (data) => {
          setWord(data);
          setAnswer("");
          setFeedback({
            result: null,
            correct_answer: null,
            score: null,
            new_badges: [],
            state: "idle"
          });
        },
        () => {
          navigate(`${vocabularyGame.link}setup`);
        }
      );
    }
  }, [searchParams, navigate, vocabularyGame.link, user]);

  function handleFormSubmit(event) {
    event.preventDefault();

    setFeedback({
      result: null,
      correct_answer: null,
      score: null,
      new_badges: [],
      state: "pending"
    });

    const token = user ? user.token : null;
    submitAnswerVocabularyGame(
      token,
      {
        word_id: word.id,
        base_language: searchParams.get("base_language"),
        answer
      },
      (data) => {
        setFeedback({
          result: data.result,
          correct_answer: data.correct_answer,
          score: data.score,
          new_badges: data.new_badges,
          state: "succeeded"
        });
      }
    );
  }

  useEffect(() => playAgain(), [playAgain]);

  return (
    <>
      {Object.keys(vocabularyGame).length === 0 ? (
        <div className="text-center">
          <CustomSpinner />
        </div>
      ) : (
        <>
          {feedback.state === "succeeded" ? (
            <FeedbackPage feedback={feedback} playAgain={playAgain} />
          ) : (
            <Form
              className="text-center"
              onSubmit={(event) => handleFormSubmit(event)}>
              <Form.Group className="mb-4" controlId="wordInput">
                <Form.Control
                  className="text-center"
                  type="text"
                  placeholder={word.word}
                  disabled
                  data-testid="word-input"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="answerInput">
                <Form.Control
                  className="text-center"
                  type="text"
                  placeholder={`Provide the translation in ${searchParams.get(
                    "base_language"
                  )}`}
                  onChange={(event) => setAnswer(event.target.value)}
                  data-testid="answer-input"
                />
              </Form.Group>
              <div className="text-center">
                <CustomButton
                  variant="success"
                  type="submit"
                  testId="submit-answer-button">
                  Verify answer
                </CustomButton>
              </div>
            </Form>
          )}
        </>
      )}
    </>
  );
}
