import { resetAccount } from "api/user";
import CustomButton from "components/CustomButton";
import FloatingLabelInput from "components/FloatingLabelInput";
import Notification from "components/Notification";
import NotificationContainer from "components/NotificationContainer";
import ShortcutButtons from "components/ShortcutButtons";
import {
  getConfirmPasswordValidators,
  getPasswordValidators
} from "components/UserForm/validators";
import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function ResetAccount() {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [feedback, setFeedback] = useState({
    result: null,
    state: "idle"
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      console.log("HELLO", params);
      resetAccount(
        params.uid,
        params.token,
        password,
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
      setShowToast(true);
    }
  }

  return (
    <>
      {feedback.result ? (
        <>
          <Alert
            variant="success"
            className="text-center"
            data-testid="successful-reset-alert">
            <p>Password successfully updated!</p>
          </Alert>
          <ShortcutButtons />
        </>
      ) : (
        <section>
          <p>Fill the form below to reset your password:</p>
          <Form noValidate onSubmit={(event) => handleFormSubmit(event)}>
            <FloatingLabelInput
              controlId="floatingPassword"
              type="password"
              label="Password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
              validators={getPasswordValidators()}
              testId="password-input"
            />
            <FloatingLabelInput
              controlId="floatingPasswordConfirm"
              type="password"
              label="Confirm your password"
              required
              placeholder="Confirm your password"
              validators={getConfirmPasswordValidators(password)}
              testId="confirm-password-input"
            />
            <div className="text-center">
              <CustomButton
                variant="success"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                testId="submit-button">
                Submit
              </CustomButton>
            </div>
          </Form>
        </section>
      )}
      <NotificationContainer>
        <Notification
          show={showToast}
          onClose={() => setShowToast(false)}
          variant="danger"
          title="Error"
          message="It was not possible to update account. Please check the information provided."
          testId="error-toast"
        />
      </NotificationContainer>
    </>
  );
}
