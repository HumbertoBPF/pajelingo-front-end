import FloatingLabelInput from "components/FloatingLabeledInput";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { getConfirmPasswordValidators, getEmailValidators, getPasswordValidators, getUsernameValidators } from "./validators";

export default function UserForm({ user={email:"", username:""}, 
                                    buttonColorStyle, buttonText , onSubmit=((email, username, password) => {}) }) {
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    
    return (
        <form noValidate onSubmit={(event) => {
            event.preventDefault();
            onSubmit(email, username, password)
        }}>
            <FloatingLabelInput 
                id="email" 
                name="email" 
                type="email" 
                label="Email address" 
                initialValue={user.email}
                required
                onChange={(target) => setEmail(target.value)}
                validators={getEmailValidators()}/>
            <FloatingLabelInput 
                id="username" 
                name="username" 
                type="text" 
                label="Username"
                initialValue={user.username}
                required
                onChange={(target) => setUsername(target.value)}
                validators={getUsernameValidators()}/>
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
                <Button variant={buttonColorStyle} type="submit">{buttonText}</Button> 
            </div>
        </form>
    );
}