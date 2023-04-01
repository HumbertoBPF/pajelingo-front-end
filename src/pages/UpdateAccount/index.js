import NotificationToast from "components/NotificationToast";
import UserForm from "components/UserForm";
import Login from "pages/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "services/base";
import { fetchUser } from "services/user";

export default function UpdateAccount() {
    const user = useSelector(store => store.user);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch, navigate, user]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);
    
    if (!user) {
        return (<Login/>);
    }

    function handleFormSubmit(event, personalData) {
        const form = event.currentTarget;

        if (form.checkValidity()) {
            fetch(`${baseUrl}/user/`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${user.token}`
                },
                body: JSON.stringify({
                    "email": personalData.email,
                    "username": personalData.username,
                    "password": personalData.password
                })
            }).then((response) => {
                if (response.ok) {
                    navigate("/profile");
                    return;
                }
    
                throw Error(response);
            }).catch(() => setShowToast(true));
        }else {
            setShowToast(true);
        }
    }

    return (
        <>
            <UserForm buttonColorStyle="info" buttonText="Update" user={user} 
                onSubmit={(event, personalData) => handleFormSubmit(event, personalData)}/>
            <NotificationToast 
                show={showToast} 
                onClose={() => setShowToast(false)} 
                variant="danger" 
                message="It was not possible to update account. Please check the information provided."/>
        </>
    );
}