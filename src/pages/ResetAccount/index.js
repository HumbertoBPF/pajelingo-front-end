import CustomizedButton from "components/CustomizedButton";
import FloatingLabelInput from "components/FloatingLabelInput";
import NotificationToast from "components/NotificationToast";
import ShortcutButtons from "components/ShortcutButtons";
import { getPasswordValidators, getConfirmPasswordValidators } from "components/UserForm/validators";
import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function ResetAccount() {
    const params = useParams();
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [feedback, setFeedback] = useState({
        result: null,
        state: "idle"
    });

    function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity()) {
            fetch(`${baseUrl}/reset-account/${params.uid}/${params.token}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "password": password
                })
            }).then((response) => {
                if (response.ok) {
                    setFeedback({
                        result: true,
                        state: "succeeded"
                    });
                    return;
                }
    
                throw Error(response);
            }).catch(() => setShowToast(true));
        }else {
            setShowToast(true);
        }
    }

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
                <Form noValidate onSubmit={(event) => handleFormSubmit(event)}>
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
                        <CustomizedButton variant="success" type="submit">Submit</CustomizedButton>
                    </div>
                </Form>
            </section>}
            <NotificationToast 
                show={showToast} 
                onClose={() => setShowToast(false)} 
                variant="danger" 
                message="It was not possible to update account. Please check the information provided."/>
        </>
    );
}