import EmailIcon from "components/icons/EmailIcon";
import UserIcon from "components/icons/UserIcon";
import styles from "./AccountDetails.module.css";
import BioIcon from "components/icons/BioIcon";

export default function AccountDetails({ user }) {
    return (
        <section className={styles["account-details"]}>
            <h5>Account details:</h5>
            <p className="mt-4">
                <UserIcon/> <span>Username: {user.username}</span>
            </p>
            {
                user.email?
                <p>
                    <EmailIcon/> <span>Email: {user.email}</span>
                </p>:
                null
            }
            <p>
                <BioIcon/> <span>Bio: {user.bio}</span>
            </p>
        </section>
    );
}