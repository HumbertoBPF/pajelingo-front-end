import Button from "components/Button";
import FloatingLabelInput from "components/FloatingLabeledInput";
import { getPasswordValidators, getUsernameValidators } from "./validators";

export default function Login() {
    return (
        <form noValidate>
            <FloatingLabelInput 
                id="username" 
                name="username" 
                type="text" 
                label="Username" 
                required 
                validators={getUsernameValidators()}/>
            <FloatingLabelInput 
                id="password" 
                name="password" 
                type="password" 
                label="Password" 
                required 
                validators={getPasswordValidators()}/>
            <a id="reset_account_link" href="#">I forgot my username/password</a>
            <br className="mb-4"/>
            <Button id="formUserSubmitButton" colorStyle="success" type="submit">Sign in</Button> 
        </form>
    );
}