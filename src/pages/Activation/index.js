import AlertCard from "components/AlertCard";
import ShortcutButtons from "components/ShortcutButtons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function Activation() {
    const params = useParams();
    const [feedback, setFeedback] = useState({
        result: null,
        state: "idle"
    });
    
    useEffect(() => {
        fetch(`${baseUrl}/activate/${params.uid}/${params.token}`, {
            method: "PUT"
        })
        .then((response) => setFeedback({
                result: true,
                state: "succeeded"
            }))
    }, [params])

    return (
        <>  
            {
                (feedback.result)?
                    <AlertCard colorStyle="success">
                        <p>Thank you for your email confirmation. Now you can sign in your account.</p>
                    </AlertCard>:
                    null
            }
            <ShortcutButtons/>
        </>
    );
}