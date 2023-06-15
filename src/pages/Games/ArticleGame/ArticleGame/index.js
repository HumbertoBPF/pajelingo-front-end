import CustomButton from "components/CustomButton";
import CustomSpinner from "components/CustomSpinner";
import useGame from "hooks/useGame";
import FeedbackPage from "pages/FeedbackPage";
import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function ArticleGame() {
  const user = useSelector((state) => state.user);

  const [searchParams] = useSearchParams();

  const [articleGame] = useGame(2);
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
    if (articleGame.link) {
      let authHeaders = {};

      if (user) {
        authHeaders["Authorization"] = `Token ${user.token}`;
      }

      fetch(`${baseUrl}/article-game?${searchParams}`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          navigate(`${articleGame.link}setup`);
        })
        .then((data) => {
          setWord(data);
          setAnswer("");
          setFeedback({
            result: null,
            correct_answer: null,
            score: null,
            new_badges: [],
            state: "idle"
          });
        });
    }
  }, [searchParams, navigate, articleGame.link, user]);

  function handleFormSubmit(event) {
    event.preventDefault();

    setFeedback({
      result: null,
      correct_answer: null,
      score: null,
      new_badges: [],
      state: "pending"
    });

    let authHeaders = {};

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
        word_id: word.id,
        answer: answer
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedback({
          result: data.result,
          correct_answer: data.correct_answer,
          score: data.score,
          new_badges: data.new_badges,
          state: "succeeded"
        });
      });
  }

  useEffect(() => playAgain(), [playAgain]);

  return (
    <>
      {Object.keys(articleGame).length === 0 ? (
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
              <div className="mb-4 row">
                <Form.Group className="col-4 col-lg-2" controlId="articleInput">
                  <Form.Control
                    className="text-center mb-4"
                    type="text"
                    placeholder="Article"
                    onChange={(event) => setAnswer(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="col-8 col-lg-10" controlId="wordInput">
                  <Form.Control
                    className="text-center mb-4"
                    type="text"
                    placeholder={word.word}
                    disabled
                  />
                </Form.Group>
              </div>
              <div className="text-center">
                <CustomButton variant="success" type="submit">
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
