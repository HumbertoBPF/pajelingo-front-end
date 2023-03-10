import { Alert, Button } from "react-bootstrap";

export default function FeedbackCard({ variant, children, onClick=((event) => {}) }) {
    return (
        <>
            <Alert className="text-center" variant={variant}>{children}</Alert>
            <div className="text-center">
                <Button  variant="success" onClick={(event) => onClick(event)}>New word</Button>
            </div>
        </>
    );
}