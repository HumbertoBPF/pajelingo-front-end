import Account from "components/Account";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function Profile() {
    const params = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}/accounts/${params.username}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            
            throw Error();
        })
        .then((data) => {
            setUser(data);
        })
        .catch(() => navigate("/accounts"));
    }, [params]);

    return (
        <Account user={user} />
    );
}