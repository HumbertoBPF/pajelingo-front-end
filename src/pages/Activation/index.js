import AlertCard from "components/AlertCard";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function Activation() {
    const params = useParams();
    const [feedback, setFeedback] = useState({
        result: null,
        message:""
    });
    
    useEffect(() => {
        fetch(`${baseUrl}/activate/${params.uid}/${params.token}`)
            .then((response) => setFeedback({
                result: "success",
                message: "Thank you for your email confirmation. Now you can sign in your account."           
            }))
    }, [params])

    return (
        <>  
            {
                (feedback.result !== null)?
                    <AlertCard colorStyle={feedback.result}>{feedback.message}</AlertCard>:
                    null
            }
            <section>
                <div className="d-flex justify-content-center">
                    <Link role="button" to="/dashboard" type="button" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                        </svg> <span>Go to dashboard</span>
                    </Link>
                </div>
                <div className="d-flex justify-content-center my-3">
                    or
                </div>
                <div className="d-flex justify-content-center">
                    <Link role="button" to="/login" className="btn btn-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                            <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg> <span>Login</span>
                    </Link>
                </div>
            </section>
        </>
    );
}