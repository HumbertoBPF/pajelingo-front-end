import FloatingLabelInput from "components/FloatingLabelInput";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getConfirmPasswordValidators, getEmailValidators, getPasswordValidators, getUsernameValidators } from "./validators";

export default function UserForm({ user={email:"", username:""}, buttonColorStyle, buttonText , 
        onSubmit=((email, username, password) => {}) }) {
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    
    return (
        <Form noValidate onSubmit={(event) => {
            event.preventDefault();
            onSubmit(email, username, password)
        }}>
            <FloatingLabelInput 
                controlId="floatingEmail" 
                type="email" 
                label="Email address" 
                placeholder="Email address" 
                defaultValue={user.email}
                required
                onChange={(event) => setEmail(event.target.value)}
                validators={getEmailValidators()}/>
            <FloatingLabelInput 
                controlId="floatingUsername" 
                type="text"  
                label="Username" 
                placeholder="Username" 
                defaultValue={user.username}
                required
                onChange={(event) => setUsername(event.target.value)}
                validators={getUsernameValidators()}/>
            <FloatingLabelInput 
                controlId="floatingPassword" 
                type="password"  
                label="Password" 
                placeholder="Password" 
                required
                onChange={(event) => setPassword(event.target.value)}
                validators={getPasswordValidators()}/>
            <FloatingLabelInput 
                controlId="floatingPasswordConfirmation" 
                type="password" 
                label="Confirm your password" 
                placeholder="Confirm your password"
                required
                validators={getConfirmPasswordValidators(password)}/>
            <div className="text-center">
                <Button variant={buttonColorStyle} type="submit">{buttonText}</Button> 
            </div>
        </Form>
    );
}