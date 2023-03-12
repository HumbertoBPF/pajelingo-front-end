import FloatingLabelInput from "components/FloatingLabelInput";
import NotificationToast from "components/NotificationToast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "services/base";
import { fetchUser } from "services/user";
import { saveToken } from "store/reducers/user";
import { getPasswordValidators, getUsernameValidators } from "./validators";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault();

        fetch(`${baseUrl}/user-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
        })})
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            
            throw Error(response);
        })
        .then((data) => {
            if (data.token){
                dispatch(saveToken(data.token));
                dispatch(fetchUser());
                navigate("/dashboard");
            }
        })
        .catch(() => setShowToast(true));
    } 

    return (
        <>
            <Form noValidate onSubmit={(event) => handleFormSubmit(event)}>
                <FloatingLabelInput 
                    controlId="floatingUsername" 
                    type="text" 
                    label="Username" 
                    placeholder="Username" 
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
                <Link to="/request-reset-account">I forgot my username/password</Link>
                <div className="text-center mt-4">
                    <Button variant="success" type="submit">Sign in</Button> 
                </div>
            </Form>
            <NotificationToast 
                show={showToast} 
                onClose={() => setShowToast(false)}
                variant="danger" 
                message="It was not possible to log you in. Please check your credentials."/>
        </>
    );
}