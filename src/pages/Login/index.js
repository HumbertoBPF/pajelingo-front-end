import CustomButton from "components/CustomButton";
import FloatingLabelInput from "components/FloatingLabelInput";
import Notification from "components/Notification";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "services/base";
import { fetchUser } from "services/user";
import { saveToken } from "store/reducers/user";
import { getPasswordValidators, getUsernameValidators } from "./validators";
import NotificationContainer from "components/NotificationContainer";

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

    fetch(`${baseUrl}/user-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response);
      })
      .then((data) => {
        setIsLoading(false);
        if (data.token) {
          dispatch(saveToken(data.token));
          dispatch(fetchUser());
          navigate("/dashboard");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setShowToast(true);
      });
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
        />
        <FloatingLabelInput
          controlId="floatingPassword"
          type="password"
          label="Password"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.target.value)}
          validators={getPasswordValidators()}
        />
        <Link to="/request-reset-account">I forgot my username/password</Link>
        <div className="text-center mt-4">
          <CustomButton
            variant="success"
            disabled={isLoading}
            isLoading={isLoading}
            type="submit">
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
        />
      </NotificationContainer>
    </>
  );
}
