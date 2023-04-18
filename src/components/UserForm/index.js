import CustomButton from "components/CustomButton";
import FloatingLabelInput from "components/FloatingLabelInput";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { getConfirmPasswordValidators, getEmailValidators, getPasswordValidators, getUsernameValidators } from "./validators";

export default function UserForm({ user={email:"", username:""}, buttonColorStyle, buttonText , isLoading=false, 
        onSubmit=(() => {}) }) {
    const [personalData, setPersonalData] = useState({
        email: user.email,
        username: user.username, 
        password: ""
    });
    
    return (
        <Form noValidate onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event, personalData);
        }}>
            <FloatingLabelInput 
                controlId="floatingEmail" 
                type="email" 
                label="Email address" 
                placeholder="Email address" 
                defaultValue={user.email}
                required
                onChange={(event) => setPersonalData({...personalData, email: event.target.value})}
                validators={getEmailValidators()}/>
            <FloatingLabelInput 
                controlId="floatingUsername" 
                type="text"  
                label="Username" 
                placeholder="Username" 
                defaultValue={user.username}
                required
                onChange={(event) => setPersonalData({...personalData, username: event.target.value})}
                validators={getUsernameValidators()}/>
            <FloatingLabelInput 
                controlId="floatingPassword" 
                type="password"  
                label="Password" 
                placeholder="Password" 
                required
                onChange={(event) => setPersonalData({...personalData, password: event.target.value})}
                validators={getPasswordValidators()}/>
            <FloatingLabelInput 
                controlId="floatingPasswordConfirmation" 
                type="password" 
                label="Confirm your password" 
                placeholder="Confirm your password"
                required
                validators={getConfirmPasswordValidators(personalData.password)}/>
            <div className="text-center">
                <CustomButton variant={buttonColorStyle} type="submit" 
                    disabled={isLoading} isLoading={isLoading}>{buttonText}</CustomButton> 
            </div>
        </Form>
    );
}