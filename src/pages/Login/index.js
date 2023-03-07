import Button from "components/Button";
import FloatingLabelInput from "components/FloatingLabeledInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "services/base";
import { fetchUser } from "services/user";
import { saveToken } from "store/reducers/user";
import { getPasswordValidators, getUsernameValidators } from "./validators";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <form noValidate onSubmit={
            (event) => {
                event.preventDefault();
                fetch(`${baseUrl}/user-token`, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password
                    })})
                    .then((response) => response.json())
                    .then((data) => {
                        dispatch(saveToken(data.token));
                        dispatch(fetchUser());
                        navigate("/dashboard");
                    });
            }
        }>
            <FloatingLabelInput 
                id="username" 
                name="username" 
                type="text" 
                label="Username" 
                required 
                validators={getUsernameValidators()}
                onChange={(value) => setUsername(value)}/>
            <FloatingLabelInput 
                id="password" 
                name="password" 
                type="password" 
                label="Password" 
                required 
                validators={getPasswordValidators()}
                onChange={(value) => setPassword(value)}/>
            <a id="reset_account_link" href="#">I forgot my username/password</a>
            <br/>
            <div className="text-center mt-4">
                <Button id="formUserSubmitButton" colorStyle="success" type="submit">Sign in</Button> 
            </div>
        </form>
    );
}