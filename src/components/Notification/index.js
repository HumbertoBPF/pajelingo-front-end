import { Toast, ToastContainer } from "react-bootstrap";

export default function Notification({ show, onClose=(() => {}), variant, title, message }) {
    return (
        <ToastContainer className="p-4" position="bottom-end" containerPosition="fixed">
            <Toast bg={variant} show={show} onClose={() => onClose()} delay={5000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}