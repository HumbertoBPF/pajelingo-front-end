import CustomButton from "components/CustomButton";
import { Alert } from "react-bootstrap";

export default function FeedbackCard({ variant, children, onClick=((event) => {}) }) {
    return (
        <>
            <Alert className="text-center" variant={variant}>{children}</Alert>
            <div className="text-center">
                <CustomButton  variant="success" onClick={(event) => onClick(event)}>New word</CustomButton>
            </div>
        </>
    );
}