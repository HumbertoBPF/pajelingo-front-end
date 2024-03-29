import EmailIcon from "components/icons/EmailIcon";
import UserIcon from "components/icons/UserIcon";
import styles from "./AccountDetails.module.css";
import BioIcon from "components/icons/BioIcon";
import PropTypes from "prop-types";

export default function AccountDetails({ user }) {
  return (
    <section className={styles["account-details"]}>
      <h5>Account details:</h5>
      <p data-testid="username-data" className="mt-4">
        <UserIcon /> <span>Username: {user.username}</span>
      </p>
      {user.email ? (
        <p data-testid="email-data">
          <EmailIcon /> <span>Email: {user.email}</span>
        </p>
      ) : null}
      <p data-testid="bio-data">
        <BioIcon /> <span>Bio: {user.bio ? user.bio : "-"}</span>
      </p>
    </section>
  );
}

AccountDetails.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string
  }).isRequired
};
