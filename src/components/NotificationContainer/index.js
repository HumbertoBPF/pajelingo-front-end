import { ToastContainer } from "react-bootstrap";

export default function NotificationContainer({ children }) {
    return (
        <ToastContainer className="p-4" position="bottom-end" containerPosition="fixed">
            {children}
        </ToastContainer>
    );
}