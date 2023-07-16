import CustomButton from "components/CustomButton";
import FloatingLabelInput from "components/FloatingLabelInput";
import Notification from "components/Notification";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "services/user";
import { saveToken } from "store/reducers/user";
import { getPasswordValidators, getUsernameValidators } from "./validators";
import NotificationContainer from "components/NotificationContainer";
import { login } from "api/user";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    login(
      username,
      password,
      (data) => {
        setIsLoading(false);
        if (data.token) {
          dispatch(saveToken(data.token));
          dispatch(fetchUser());
          navigate("/dashboard");
        }
      },
      () => {
        setIsLoading(false);
        setShowToast(true);
      }
    );
  }

  return (
    <>
      <Form noValidate onSubmit={(event) => handleFormSubmit(event)}>
        <FloatingLabelInput
          controlId="floatingUsername"
          type="text"
          label="Username"
          placeholder="Username"
          required
          onChange={(event) => setUsername(event.target.value)}
          validators={getUsernameValidators()}
          testId="username-input"
        />
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
        <Link to="/request-reset-account" data-testid="link-forgot-password">
          I forgot my username/password
        </Link>
        <div className="text-center mt-4">
          <CustomButton
            variant="success"
            disabled={isLoading}
            isLoading={isLoading}
            type="submit"
            testId="login-button">
            Sign in
          </CustomButton>
        </div>
      </Form>
      <NotificationContainer>
        <Notification
          show={showToast}
          onClose={() => setShowToast(false)}
          variant="danger"
          title="Error"
          message="It was not possible to log you in. Please check your credentials."
          testId="toast-error"
        />
      </NotificationContainer>
    </>
  );
}
