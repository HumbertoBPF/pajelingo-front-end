import { useState } from "react";
import { Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function LabeledInput({
  controlId,
  type,
  label = null,
  labelPosition = "right",
  placeholder = "",
  disabled = false,
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

  let extraPropsLabel = {};
  let extraPropsInput = {};
  let extraClasses = "";

  if (label === null || labelPosition === "up") {
    extraPropsLabel = { xs: "12", sm: "12" };
    extraPropsInput = { xs: "12", sm: "12" };
  } else if (labelPosition === "right") {
    extraPropsLabel = { sm: "3", lg: "2" };
    extraPropsInput = { sm: "9", lg: "10" };
    extraClasses = "text-center";
  }

  if (errors.length !== 0) {
    extraClasses = `${extraClasses} is-invalid`;
  }

  return (
    <Form.Group
      controlId={controlId}
      className="mb-4 row"
      onInput={(event) => validate(event.target)}
      onChange={(event) => onChange(event)}
      data-testid={testId}>
      <Form.Label className={extraClasses} column {...extraPropsLabel}>
        {label}
      </Form.Label>
      <Col {...extraPropsInput}>
        <Form.Control
          className={extraClasses}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
        />
        <Form.Control.Feedback className="mt-4" type="invalid">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
}

LabeledInput.propTypes = {
  controlId: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(["right", "up"]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  validators: PropTypes.array,
  testId: PropTypes.string
};
