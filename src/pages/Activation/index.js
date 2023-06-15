import ShortcutButtons from "components/ShortcutButtons";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function Activation() {
  const params = useParams();
  const [feedback, setFeedback] = useState({
    result: null,
    state: "idle"
  });

  useEffect(() => {
    fetch(`${baseUrl}/activate/${params.uid}/${params.token}`, {
      method: "PUT"
    }).then((response) =>
      setFeedback({
        result: response.ok,
        state: "succeeded"
      })
    );
  }, [params]);

  return (
    <>
      {feedback.result ? (
        <Alert variant="success" className="text-center">
          Thank you for your email confirmation. Now you can sign in your
          account.
        </Alert>
      ) : (
        <Alert variant="danger" className="text-center">
          Invalid token!
        </Alert>
      )}
      <ShortcutButtons />
    </>
  );
}
