import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export default function CustomButton({
  className = "",
  type,
  variant,
  disabled = false,
  isLoading = false,
  onClick = () => {},
  children,
  testId = ""
}) {
  let styles = {};

  if (variant === "info") {
    styles = { color: "white" };
  }

  return (
    <Button
      className={className}
      style={styles}
      type={type}
      variant={variant}
      disabled={disabled}
      onClick={(event) => onClick(event)}
      data-testid={testId}>
      {isLoading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          data-testid="button-spinner"
        />
      ) : null}
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  testId: PropTypes.string
};
