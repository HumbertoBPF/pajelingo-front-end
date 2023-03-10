import FloatingLabelInput from "components/FloatingLabelInput";
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
            <FloatingLabelInput controlId="floatingEmail" type="email" 
                label="Email address" placeholder="Email address" onChange={(event) => setEmail(event.target.value)}/>
            <FloatingLabelInput controlId="floatingUsername" type="text"  
                label="Username" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
            <FloatingLabelInput controlId="floatingPassword" type="password"  
                label="Password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
            <FloatingLabelInput controlId="floatingPasswordConfirmation" type="password" 
                label="Confirm your password" placeholder="Confirm your password"/>
            <div className="text-center">
                <Button variant={buttonColorStyle} type="submit">{buttonText}</Button> 
            </div>
        </form>
    );
}