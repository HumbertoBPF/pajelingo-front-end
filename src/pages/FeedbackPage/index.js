import FeedbackAlert from "components/FeedbackAlert";
import Notification from "components/Notification";
import NotificationContainer from "components/NotificationContainer";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function FeedbackPage({ feedback, playAgain = () => {} }) {
  const [showToast, setShowToast] = useState(false);

  const { correct_answer, result, score } = feedback;
  const correct_answer_formatted = correct_answer.split("\n");

  useEffect(() => {
    console.log(feedback.new_badges);
    if (feedback.new_badges) {
      setShowToast(true);
    }
  }, [feedback.new_badges]);

  return (
    <>
      <FeedbackAlert
        variant={result ? "success" : "danger"}
        onClick={playAgain}>
        {`${result ? "Correct answer :)" : "Wrong answer"}`}
        <br />
        {correct_answer_formatted.length > 1 ? (
          correct_answer_formatted.map((item, index) =>
            index === correct_answer_formatted.length - 1 ? (
              <span key={index}>{item}</span>
            ) : (
              <span key={index}>
                {item}
                <br />
              </span>
            )
          )
        ) : (
          <>
            {correct_answer_formatted[0]}
            <br />
          </>
        )}
        {score ? `Your score is ${score}` : null}
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
    score: PropTypes.number.isRequired,
    new_badges: PropTypes.array.isRequired,
    state: PropTypes.oneOf(["idle", "pending", "succeeded"]).isRequired
  }).isRequired,
  playAgain: PropTypes.func
};
