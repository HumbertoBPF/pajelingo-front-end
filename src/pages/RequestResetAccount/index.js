import { requestResetAccount } from "api/user";
import CustomButton from "components/CustomButton";
import FloatingLabelInput from "components/FloatingLabelInput";
import Notification from "components/Notification";
import NotificationContainer from "components/NotificationContainer";
import { getEmailValidators } from "components/UserForm/validators";
import { useState } from "react";
import { Alert, Form } from "react-bootstrap";

export default function RequestResetAccount() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [feedback, setFeedback] = useState({
    result: null,
    state: "idle"
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    requestResetAccount(
      email,
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
  }

  return (
    <>
      {feedback.result ? (
        <Alert
          variant="success"
          className="text-center"
          data-testid="successful-reset-alert">
          <p>
            Check the specified email to reset your account. If there is an
            email associated with a Pajelingo account, you should have received
            an email with a reset link.
          </p>
          <img
            src="/images/send_email.png"
            className="img-fluid rounded col-6 col-sm-4 col-md-4 col-lg-3"
            alt="Email being sent"
          />
        </Alert>
      ) : (
        <Form noValidate onSubmit={(event) => handleFormSubmit(event)}>
          <FloatingLabelInput
            controlId="floatingEmail"
            type="email"
            label="Email"
            placeholder="Email"
            required
            validators={getEmailValidators()}
            onChange={(event) => setEmail(event.target.value)}
            testId="email-input"
          />
          <div className="text-center">
            <CustomButton
              variant="success"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              testId="submit-button">
              Reset password
            </CustomButton>
          </div>
        </Form>
      )}
      <NotificationContainer>
        <Notification
          show={showToast}
          onClose={() => setShowToast(false)}
          variant="danger"
          title="Error"
          message="It was not possible to request the account reset. Please check the information provided."
          testId="error-toast"
        />
      </NotificationContainer>
    </>
  );
}
