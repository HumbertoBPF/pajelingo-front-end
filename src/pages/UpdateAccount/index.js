import UserForm from "components/UserForm";
import Login from "pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "services/base";
import { fetchUser } from "services/user";

export default function UpdateAccount() {
    const user = useSelector(store => store.user);
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

    return (
        <UserForm buttonColorStyle="info" buttonText="Update" user={user} onSubmit={(email, username, password) => {
            console.log(email);
            console.log(username);
            console.log(password);
            fetch(`${baseUrl}/user/`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${user.token}`
                },
                body: JSON.stringify({
                    "email": email,
                    "username": username,
                    "password": password
                })
            }).then((response) => {
                if (response.ok) {
                    navigate("/profile");
                }
            });
        }}/>
    );
}