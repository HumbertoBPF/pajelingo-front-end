import NotificationToast from "components/NotificationToast";
import UserForm from "components/UserForm";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { baseUrl } from "services/base";

export default function SignUp() {
    const [showToast, setShowToast] = useState(false);
    const [feedback, setFeedback] = useState({
        result: null,
        state: "idle"
    });

    function handleFormSubmit(email, username, password) {
        setFeedback({
            result: null,
            state: "pending"
        });
        fetch(`${baseUrl}/user/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "username": username,
                "password": password
            })
        }).then((response) => {
            if (response.ok){
                return response.json();
            }

            throw Error(response);
        }).then((data) => {
            setFeedback({
                result: true,
                state: "succeeded"
            });
        }).catch(() => setShowToast(true));
    }

    return (
        <>
            {(feedback.state === "succeeded")?
            <Alert variant="success" className="text-center">
                <p>Account successfully created. Please check your email to activate it.</p>
                <img src="images/send_email.png" className="img-fluid rounded col-6 col-sm-4 col-md-4 col-lg-3" alt="Email being sent"/>
            </Alert>:
            <UserForm buttonColorStyle="success" buttonText="Sign up" 
                onSubmit={(email, username, password) => handleFormSubmit(email, username, password)}/>}
            <NotificationToast 
                show={showToast} 
                onClose={() => setShowToast(false)} 
                variant="danger" 
                message="It was not possible to create account. Please check the information provided."/>
        </>
    );
}