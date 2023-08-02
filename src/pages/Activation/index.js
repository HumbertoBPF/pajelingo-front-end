import { activateAccount } from "api/user";
import ShortcutButtons from "components/ShortcutButtons";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Activation() {
  const params = useParams();
  const [feedback, setFeedback] = useState({
    result: null,
    state: "idle"
  });

  useEffect(() => {
    activateAccount(
      params.uid,
      params.token,
      () => {
        setFeedback({
          result: true,
          state: "succeeded"
        });
      },
      () => {
        setFeedback({
          result: false,
          state: "succeeded"
        });
      }
    );
  }, [params.uid, params.token]);

  return (
    <>
      {feedback.result ? (
        <Alert
          variant="success"
          className="text-center"
          data-testid="success-alert">
          Thank you for your email confirmation. Now you can sign in your
          account.
        </Alert>
      ) : (
        <Alert
          variant="danger"
          className="text-center"
          data-testid="error-alert">
          Invalid token!
        </Alert>
      )}
      <ShortcutButtons />
    </>
  );
}
