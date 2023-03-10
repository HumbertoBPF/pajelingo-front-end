import FloatingLabelInput from "components/FloatingLabeledInput";
import { useState } from "react";
import { Button } from "react-bootstrap";
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
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password
                })})
                .then((response) => {
                    if ((response.ok) || (response.status === 400)) {
                        return response.json();
                    }
                    
                    throw Error(response);
                })
                .then((data) => {
                    if (data.token){
                        console.log("doesn't have errors");
                        dispatch(saveToken(data.token));
                        dispatch(fetchUser());
                        navigate("/dashboard");
                    }else {
                        console.log("validation error");
                        console.log(data.username);
                        console.log(data.password);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    console.error(err.name);
                    console.error(err.message);
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
            <Link to="/request-reset-account">I forgot my username/password</Link>
            <br/>
            <div className="text-center mt-4">
                <Button variant="success" type="submit">Sign in</Button> 
            </div>
        </form>
    );
}