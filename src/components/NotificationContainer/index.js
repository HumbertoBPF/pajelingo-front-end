import { ToastContainer } from "react-bootstrap";
import PropTypes from "prop-types";

export default function NotificationContainer({ children }) {
  return (
    <ToastContainer
      className="p-4"
      position="bottom-end"
      containerPosition="fixed">
      {children}
    </ToastContainer>
  );
}

NotificationContainer.propTypes = {
  children: PropTypes.any
};
