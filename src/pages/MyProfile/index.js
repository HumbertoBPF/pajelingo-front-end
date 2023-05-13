import Login from "pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchUser } from "services/user";
import Account from "components/Account";

export default function MyProfile() {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);

    if (!user) {
        return (<Login/>);
    }

    return (
        <Account user={user} />
    );
}