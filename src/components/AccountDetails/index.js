import EmailIcon from "components/icons/EmailIcon";
import UserIcon from "components/icons/UserIcon";

export default function AccountDetails({ user }) {
    return (
        <section>
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
        </section>
    );
}