import { updateAccount } from "api/user";
import Notification from "components/Notification";
import NotificationContainer from "components/NotificationContainer";
import UserForm from "components/UserForm";
import Login from "pages/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "services/user";

export default function UpdateAccount() {
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
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
    return <Login />;
  }

  function handleFormSubmit(event, personalData) {
    const form = event.currentTarget;
    setIsLoading(true);

    if (form.checkValidity()) {
      updateAccount(
        user.token,
        {
          email: personalData.email,
          username: personalData.username,
          bio: personalData.bio,
          password: personalData.password
        },
        () => {
          setIsLoading(false);
          navigate("/profile");
        },
        () => {
          setIsLoading(false);
          setShowToast(true);
        }
      );
    } else {
      setIsLoading(false);
      setShowToast(true);
    }
  }

  return (
    <>
      <UserForm
        buttonColorStyle="info"
        buttonText="Update"
        user={user}
        isLoading={isLoading}
        onSubmit={(event, personalData) =>
          handleFormSubmit(event, personalData)
        }
      />
      <NotificationContainer>
        <Notification
          show={showToast}
          onClose={() => setShowToast(false)}
          variant="danger"
          title="Error"
          message="It was not possible to update account. Please check the information provided."
          testId="error-toast"
        />
      </NotificationContainer>
    </>
  );
}
