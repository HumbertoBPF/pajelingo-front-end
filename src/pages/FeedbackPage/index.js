import FeedbackAlert from "components/FeedbackAlert";
import Notification from "components/Notification";
import NotificationContainer from "components/NotificationContainer";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function FeedbackPage({ feedback, playAgain = () => {} }) {
  const [showToast, setShowToast] = useState(false);

  const { result, score } = feedback;
  const correctAnswer = feedback.correct_answer;
  const correctAnswerFormatted = correctAnswer.split("\n");

  useEffect(() => {
    if (feedback.new_badges) {
      setShowToast(true);
    }
  }, [feedback.new_badges]);

  return (
    <>
      <FeedbackAlert
        variant={result ? "success" : "danger"}
        onClick={playAgain}
        testId="feedback-alert">
        <>
          <span data-testid="feedback">{`${
            result ? "Correct answer :)" : "Wrong answer"
          }`}</span>
          <br />
          {correctAnswerFormatted.length > 1 ? (
            correctAnswerFormatted.map((item, index) => (
              <div key={index}>
                <span data-testid={`${index + 1}th-response-item`}>{item}</span>
                {index === correctAnswerFormatted.length - 1 ? null : <br />}
              </div>
            ))
          ) : (
            <>
              <span data-testid="unique-response-item">
                {correctAnswerFormatted[0]}
              </span>
              <br />
            </>
          )}
          {score ? (
            <span data-testid="score">{`Your score is ${score}`}</span>
          ) : null}
        </>
      </FeedbackAlert>
      {feedback.new_badges ? (
        <NotificationContainer>
          {feedback.new_badges.map((badge) => (
            <Notification
              key={badge.id}
              show={showToast}
              onClose={() => setShowToast(false)}
              variant="success"
              title={`New achievement: ${badge.name}`}
              message={badge.description}
              testId={`${badge.id}-notification-badge`}
            />
          ))}
        </NotificationContainer>
      ) : null}
    </>
  );
}

FeedbackPage.propTypes = {
  feedback: PropTypes.shape({
    result: PropTypes.bool.isRequired,
    correct_answer: PropTypes.string.isRequired,
    score: PropTypes.number,
    new_badges: PropTypes.array.isRequired,
    state: PropTypes.oneOf(["idle", "pending", "succeeded"]).isRequired
  }).isRequired,
  playAgain: PropTypes.func
};
