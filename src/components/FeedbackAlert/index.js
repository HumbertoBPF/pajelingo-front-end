import CustomButton from "components/CustomButton";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

export default function FeedbackAlert({
  variant,
  children,
  onClick = () => {}
}) {
  return (
    <>
      <Alert className="text-center" variant={variant}>
        {children}
      </Alert>
      <div className="text-center">
        <CustomButton
          variant="success"
          data-testid="new-word-button"
          onClick={(event) => onClick(event)}>
          New word
        </CustomButton>
      </div>
    </>
  );
}

FeedbackAlert.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func
};
