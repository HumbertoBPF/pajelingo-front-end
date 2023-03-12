import FloatingLabelInput from "components/FloatingLabelInput";
import ShortcutButtons from "components/ShortcutButtons";
import { getPasswordValidators, getConfirmPasswordValidators } from "components/UserForm/validators";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
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
                <Alert variant="success" className="text-center">
                    <p>Password successfully updated!</p>
                </Alert>
                <ShortcutButtons/>
            </>:
            <section>
                <p>Fill the form below to reset your password:</p>
                <Form noValidate onSubmit={
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
                        controlId="floatingPassword" 
                        type="password" 
                        label="Password" 
                        placeholder="Password" 
                        required
                        onChange={(event) => setPassword(event.target.value)}
                        validators={getPasswordValidators()}/>
                    <FloatingLabelInput 
                        controlId="floatingPasswordConfirm" 
                        type="password" 
                        label="Confirm your password" 
                        required
                        placeholder="Confirm your password"
                        validators={getConfirmPasswordValidators(password)}/>
                    <div className="text-center">
                        <Button variant="success" type="submit">Submit</Button>
                    </div>
                </Form>
            </section>}
        </>
    );
}