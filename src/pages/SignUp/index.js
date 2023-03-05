import Button from "components/Button";
import FloatingLabelInput from "components/FloatingLabeledInput";
import { useState } from "react";
import { baseUrl } from "services/base";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    return (
        <form onSubmit={(event) => {
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
                onChange={(target) => setEmail(target.value)}/>
            <FloatingLabelInput 
                id="username" 
                name="username" 
                type="text" 
                label="Username"
                onChange={(target) => setUsername(target.value)}/>
            <FloatingLabelInput 
                id="password" 
                name="password" 
                type="password" 
                label="Password"
                onChange={(target) => setPassword(target.value)}/>
            <FloatingLabelInput 
                id="confirm_password" 
                name="confirm_password" 
                type="password" 
                label="Confirm your password"
                onChange={(target) => setConfirmationPassword(target.value)}/>
            <Button id="formUserSubmitButton" colorStyle="success" type="submit">Sign up</Button> 
        </form>
    );
}