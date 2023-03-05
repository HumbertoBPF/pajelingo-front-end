import AlertCard from "components/AlertCard";
import Button from "components/Button";
import FloatingLabelInput from "components/FloatingLabeledInput";
import { useState } from "react";
import { baseUrl } from "services/base";
import { getConfirmPasswordValidators, getEmailValidators, getPasswordValidators, getUsernameValidators } from "./validators";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState({
        result: null,
        state: "idle"
    });

    return (
        (feedback.state === "succeeded")?
        <AlertCard colorStyle="success">
            <p>Account successfully created. Please check your email to activate it.</p>
            <img src="images/send_email.png" className="img-fluid rounded col-6 col-sm-4 col-md-4 col-lg-3" alt="Email being sent"/>
        </AlertCard>:
        <form noValidate onSubmit={(event) => {
            event.preventDefault();
            setFeedback({
                result: null,
                state: "pending"
            });
            fetch(`${baseUrl}/user/`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "username": username,
                    "password": password
                })
            }).then((response) => response.json()).then((data) => {
                setFeedback({
                    result: true,
                    state: "succeeded"
                });
            });
        }}>
            <FloatingLabelInput 
                id="email" 
                name="email" 
                type="email" 
                label="Email address" 
                required
                onChange={(value) => setEmail(value)}
                validators={getEmailValidators()}/>
            <FloatingLabelInput 
                id="username" 
                name="username" 
                type="text" 
                label="Username"
                required
                onChange={(value) => setUsername(value)}
                validators={getUsernameValidators()}/>
            <FloatingLabelInput 
                id="password" 
                name="password" 
                type="password" 
                label="Password"
                required
                onChange={(value) => setPassword(value)}
                validators={getPasswordValidators()}/>
            <FloatingLabelInput 
                id="confirm_password" 
                name="confirm_password" 
                type="password" 
                label="Confirm your password"
                required
                validators={getConfirmPasswordValidators(password)}/>
            <Button id="formUserSubmitButton" colorStyle="success" type="submit">Sign up</Button> 
        </form>
    );
}