import { signup } from "api/user";
import Notification from "components/Notification";
import NotificationContainer from "components/NotificationContainer";
import UserForm from "components/UserForm";
import { useState } from "react";
import { Alert } from "react-bootstrap";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [feedback, setFeedback] = useState({
    result: null,
    state: "idle"
  });

  function handleFormSubmit(event, personalData) {
    const form = event.currentTarget;
    setIsLoading(true);

    if (form.checkValidity()) {
      setFeedback({
        result: null,
        state: "pending"
      });

      signup(
        {
          email: personalData.email,
          username: personalData.username,
          bio: personalData.bio,
          password: personalData.password
        },
        () => {
          setIsLoading(false);
          setFeedback({
            result: true,
            state: "succeeded"
          });
        },
        () => {
          setIsLoading(false);
          setShowToast(true);
        }
      );
    } else {
      setIsLoading(false);
      setShowToast(true);
    }
  }

  return (
    <>
      {feedback.state === "succeeded" ? (
        <Alert
          variant="success"
          className="text-center"
          data-testid="success-alert">
          <p>
            Account successfully created. Please check your email to activate
            it.
          </p>
          <img
            src="images/send_email.png"
            className="img-fluid rounded col-6 col-sm-4 col-md-4 col-lg-3"
            alt="Email being sent"
          />
        </Alert>
      ) : (
        <UserForm
          buttonColorStyle="success"
          buttonText="Sign up"
          isLoading={isLoading}
          onSubmit={(event, personalData) =>
            handleFormSubmit(event, personalData)
          }
        />
      )}
      <NotificationContainer>
        <Notification
          show={showToast}
          onClose={() => setShowToast(false)}
          variant="danger"
          title="Error"
          message="It was not possible to create account. Please check the information provided."
          testId="error-toast"
        />
      </NotificationContainer>
    </>
  );
}
