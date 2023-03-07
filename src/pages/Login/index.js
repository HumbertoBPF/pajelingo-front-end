import Button from "components/Button";
import FloatingLabelInput from "components/FloatingLabeledInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
                onChange={(target) => setUsername(target.value)}/>
            <FloatingLabelInput 
                id="password" 
                name="password" 
                type="password" 
                label="Password" 
                required 
                validators={getPasswordValidators()}
                onChange={(target) => setPassword(target.value)}/>
            <Link>I forgot my username/password</Link>
            <br/>
            <div className="text-center mt-4">
                <Button id="formUserSubmitButton" colorStyle="success" type="submit">Sign in</Button> 
            </div>
        </form>
    );
}