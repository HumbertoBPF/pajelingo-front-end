import Button from "components/Button";
import FloatingLabelInput from "components/FloatingLabeledInput";

export default function Login() {
    return (
        <form>
            <FloatingLabelInput id="email" name="email" type="email" label="Email address"/>
            <FloatingLabelInput id="password" name="password" type="password" label="Password"/>
            <a id="reset_account_link" href="#">I forgot my username/password</a>
            <br/>
            <Button id="formUserSubmitButton" colorStyle="success" type="submit">Sign in</Button> 
        </form>
    );
}