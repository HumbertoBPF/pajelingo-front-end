import CustomButton from "components/CustomButton";
import FloatingLabelInput from "components/FloatingLabelInput";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import {
  getConfirmPasswordValidators,
  getEmailValidators,
  getPasswordValidators,
  getUsernameValidators
} from "./validators";
import PropTypes from "prop-types";

export default function UserForm({
  user = { email: "", username: "" },
  buttonColorStyle,
  buttonText,
  isLoading = false,
  onSubmit = () => {}
}) {
  const [personalData, setPersonalData] = useState({
    email: user.email,
    username: user.username,
    bio: user.bio ? user.bio : "",
    password: ""
  });

  return (
    <Form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event, personalData);
      }}>
      <FloatingLabelInput
        controlId="floatingEmail"
        type="email"
        label="Email address"
        placeholder="Email address"
        defaultValue={user.email}
        required
        onChange={(event) =>
          setPersonalData({ ...personalData, email: event.target.value })
        }
        validators={getEmailValidators()}
      />
      <FloatingLabelInput
        controlId="floatingUsername"
        type="text"
        label="Username"
        placeholder="Username"
        defaultValue={user.username}
        required
        onChange={(event) =>
          setPersonalData({ ...personalData, username: event.target.value })
        }
        validators={getUsernameValidators()}
      />
      <FloatingLabel
        controlId="floatingTextareaBio"
        label="Bio"
        className="mb-4"
        onChange={(event) =>
          setPersonalData({ ...personalData, bio: event.target.value })
        }>
        <Form.Control
          as="textarea"
          placeholder="Bio"
          maxLength={500}
          style={{ height: "100px" }}
          defaultValue={personalData.bio}
        />
        <Form.Text muted>
          {`${personalData.bio.length}/500 (The bio can have 500 characters at most)`}
        </Form.Text>
      </FloatingLabel>
      <FloatingLabelInput
        controlId="floatingPassword"
        type="password"
        label="Password"
        placeholder="Password"
        required
        onChange={(event) =>
          setPersonalData({ ...personalData, password: event.target.value })
        }
        validators={getPasswordValidators()}
      />
      <FloatingLabelInput
        controlId="floatingPasswordConfirmation"
        type="password"
        label="Confirm your password"
        placeholder="Confirm your password"
        required
        validators={getConfirmPasswordValidators(personalData.password)}
      />
      <div className="text-center">
        <CustomButton
          variant={buttonColorStyle}
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}>
          {buttonText}
        </CustomButton>
      </div>
    </Form>
  );
}

UserForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string
  }),
  buttonColorStyle: PropTypes.string,
  buttonText: PropTypes.string,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func
};
