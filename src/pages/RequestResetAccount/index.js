import AlertCard from "components/AlertCard";
import Button from "components/Button";
import FloatingLabelInput from "components/FloatingLabeledInput";
import { getEmailValidators } from "components/UserForm/validators";
import { useState } from "react";
import { baseUrl } from "services/base";

export default function RequestResetAccount() {
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState({
        result: null,
        state: "idle"
    });

    return (
        <>
            {
                (feedback.result)?
                <AlertCard colorStyle="success">
                    <p>Check the specified email to reset your account. If there is an email associated with a Pajelingo account, you
                        should have received an email with a reset link.</p>
                    <img src="/images/send_email.png" className="img-fluid rounded col-6 col-sm-4 col-md-4 col-lg-3" alt="Email being sent"/>
                </AlertCard>:
                <form noValidate onSubmit={
                    (event) => {
                        event.preventDefault();
                        fetch(`${baseUrl}/request-reset-account/`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "email": email
                            })
                        }).then((response) => setFeedback({
                            result: true,
                            state: "succeeded"
                        }));
                    }
                }>
                    <FloatingLabelInput id="emailInput" name="email" type="email" label="Your email address" required 
                        validators={getEmailValidators()} onChange={
                            (target) => {
                                setEmail(target.value);
                            }
                        }/>
                    <div className="text-center">
                        <Button id="submitRequestResetAccountButton" colorStyle="success" type="submit">Reset password</Button>
                    </div>
                </form>
            }
        </>
    );
}