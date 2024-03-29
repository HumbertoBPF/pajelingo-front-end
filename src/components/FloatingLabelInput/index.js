import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function FloatingLabelInput({
  controlId,
  type,
  label = "",
  placeholder = "",
  defaultValue = "",
  required = false,
  onChange = () => {},
  validators = [],
  testId = ""
}) {
  const [errors, setErrors] = useState([]);

  function validate(target) {
    const errorList = [];

    validators.forEach((validator) => {
      if (!validator.validate(target)) {
        errorList.push(validator.errorMessage);
      }
    });

    target.setCustomValidity(
      errorList.length === 0 ? "" : errorList.toString()
    );
    setErrors(errorList);
  }

  return (
    <FloatingLabel
      controlId={controlId}
      className="mb-4"
      label={label}
      onChange={(event) => onChange(event)}
      onInput={(event) => validate(event.target)}
      onFocus={(event) => validate(event.target)}
      data-testid={testId}>
      <Form.Control
        className={errors.length === 0 ? "" : "is-invalid"}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
      />
      <Form.Control.Feedback className="mt-4" type="invalid">
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

FloatingLabelInput.propTypes = {
  controlId: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  validators: PropTypes.array,
  testId: PropTypes.string
};
