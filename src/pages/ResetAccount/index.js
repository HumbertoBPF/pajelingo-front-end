import FloatingLabelInput from "components/FloatingLabeledInput";
import ShortcutButtons from "components/ShortcutButtons";
import { getPasswordValidators, getConfirmPasswordValidators } from "components/UserForm/validators";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function ResetAccount() {
    const params = useParams();
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState({
        result: null,
        state: "idle"
    });

    return (
        <>
            {(feedback.result)?
            <>              
                <Alert variant="success">
                    <p>Password successfully updated!</p>
                </Alert>
                <ShortcutButtons/>
            </>:
            <section>
                <p>Fill the form below to reset your password:</p>
                <form noValidate onSubmit={
                    (event) => {
                        event.preventDefault();
                        fetch(`${baseUrl}/reset-account/${params.uid}/${params.token}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "password": password
                            })
                        }).then((response) => setFeedback({
                            result: true,
                            state: "succeeded"
                        }));
                    }
                }>
                    <FloatingLabelInput 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password"
                        required
                        onChange={(target) => setPassword(target.value)}
                        validators={getPasswordValidators()}/>
                    <FloatingLabelInput 
                        id="confirm_password" 
                        name="confirm_password" 
                        type="password" 
                        label="Confirm your password"
                        required
                        validators={getConfirmPasswordValidators(password)}/>
                    <div className="text-center">
                        <Button variant="success" type="submit">Submit</Button>
                    </div>
                </form>
            </section>}
        </>
    );
}