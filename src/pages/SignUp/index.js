import Button from "components/Button";
import FloatingLabelInput from "components/FloatingLabeledInput";
import { useState } from "react";
import { baseUrl } from "services/base";
import { getConfirmPasswordValidators, getEmailValidators, getPasswordValidators, getUsernameValidators } from "./validators";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    return (
        <form noValidate onSubmit={(event) => {
            event.preventDefault();
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
                console.log(data);
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
                onChange={(value) => setConfirmationPassword(value)}
                validators={getConfirmPasswordValidators(password)}/>
            <Button id="formUserSubmitButton" colorStyle="success" type="submit">Sign up</Button> 
        </form>
    );
}