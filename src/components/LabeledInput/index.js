import { useState } from "react";
import { Col, Form } from "react-bootstrap";

export default function LabeledInput({
  controlId,
  type,
  label = null,
  labelPosition = "right",
  placeholder = "",
  disabled = false,
  onChange = (event) => {},
  validators = [],
}) {
  const [errors, setErrors] = useState([]);

  function validate(target) {
    let errorList = [];

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
      className="mb-4 row"
      controlId={controlId}
      onInput={(event) => validate(event.target)}
      onChange={(event) => onChange(event)}>
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
