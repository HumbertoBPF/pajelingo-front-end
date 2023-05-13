import Account from "components/Account";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "services/base";

export default function Profile() {
    const params = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log(params.username);
        fetch(`${baseUrl}/accounts/${params.username}`)
        .then((response) => response.json())
        .then((data) => {
            setUser(data);
        });
    }, [params]);

    return (
        <Account user={user} />
    );
}