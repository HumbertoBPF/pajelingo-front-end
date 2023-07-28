import { getAccount } from "api/user";
import Account from "components/Account";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getAccount(
      params.username,
      (data) => {
        setUser(data);
      },
      () => navigate("/accounts")
    );
  }, [params, navigate]);

  return <Account user={user} />;
}
