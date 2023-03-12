import CustomizedButton from "components/CustomizedButton";
import { Alert } from "react-bootstrap";

export default function FeedbackCard({ variant, children, onClick=((event) => {}) }) {
    return (
        <>
            <Alert className="text-center" variant={variant}>{children}</Alert>
            <div className="text-center">
                <CustomizedButton  variant="success" onClick={(event) => onClick(event)}>New word</CustomizedButton>
            </div>
        </>
    );
}