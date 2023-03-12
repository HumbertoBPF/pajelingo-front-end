import CustomizedButton from "components/CustomizedButton";
import FloatingLabelInput from "components/FloatingLabelInput";
import NotificationToast from "components/NotificationToast";
import { getEmailValidators } from "components/UserForm/validators";
import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { baseUrl } from "services/base";

export default function RequestResetAccount() {
    const [email, setEmail] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [feedback, setFeedback] = useState({
        result: null,
        state: "idle"
    });

    function handleFormSubmit(event) {
        event.preventDefault();
        fetch(`${baseUrl}/request-reset-account/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email
            })
        }).then((response) => {
            if (response.ok){
                setFeedback({
                    result: true, 
                    state: "succeeded"
                })
                return;
            }

            throw Error(response);
        }).catch(() => setShowToast(true));
    }

    return (
        <>
            {
                (feedback.result)?
                <Alert variant="success" className="text-center">
                    <p>Check the specified email to reset your account. If there is an email associated with a Pajelingo account, you
                        should have received an email with a reset link.</p>
                    <img src="/images/send_email.png" className="img-fluid rounded col-6 col-sm-4 col-md-4 col-lg-3" alt="Email being sent"/>
                </Alert>:
                <Form noValidate onSubmit={(event) => handleFormSubmit(event)}>
                    <FloatingLabelInput 
                        controlId="floatingEmail" 
                        type="email" 
                        label="Email" 
                        placeholder="Email"
                        required
                        validators={getEmailValidators()} 
                        onChange={(event) => setEmail(event.target.value)}/>
                    <div className="text-center">
                        <CustomizedButton variant="success" type="submit">Reset password</CustomizedButton>
                    </div>
                </Form>
            }
            <NotificationToast 
                show={showToast} 
                onClose={() => setShowToast(false)}
                variant="danger" 
                message="It was not possible to request the account reset. Please check the information provided."/>
        </>
    );
}