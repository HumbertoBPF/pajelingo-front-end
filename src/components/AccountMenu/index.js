import SignInIcon from "components/icons/SignInIcon";
import SignUpIcon from "components/icons/SignUpIcon";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AccountMenu.module.css";
import LogoutIcon from "components/icons/LogoutIcon";
import UserIcon from "components/icons/UserIcon";
import { useDispatch } from "react-redux";
import { deleteUser } from "store/reducers/user";
import PropTypes from "prop-types";

export default function AccountMenu({ user }) {
  const dispatch = useDispatch();

  function renderProfilePicture() {
    if (user.picture) {
      return (
        <img
          src={`data:image/jpeg;base64,${user.picture}`}
          alt="User profile"
        />
      );
    }

    return <img src="/images/profile.png" alt="User profile" />;
  }

  if (user) {
    return (
      <Dropdown className={`${styles["account-options"]}`}>
        <Dropdown.Toggle
          data-testid="profile-dropdown"
          className={`btn btn-account-options ${styles["btn"]}`}>
          {renderProfilePicture()}
          <span> {user.username}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            data-testid="profile-item"
            className="dropdown-item"
            href="/profile">
            <UserIcon /> <span>Profile</span>
          </Dropdown.Item>
          <Dropdown.Item
            data-testid="logout-item"
            className="dropdown-item"
            onClick={() => dispatch(deleteUser())}>
            <LogoutIcon /> <span>Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <div className={`${styles["account-options"]}`}>
      <Link
        className="btn btn-success"
        to="/signup"
        role="button"
        data-testid="signup-button">
        <SignUpIcon /> <span>Sign up</span>
      </Link>
      <Link
        className="btn btn-primary ms-2"
        to="/login"
        role="button"
        data-testid="signin-button">
        <SignInIcon /> <span>Sign in</span>
      </Link>
    </div>
  );
}

AccountMenu.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    picture: PropTypes.string
  })
};
