import { Link } from "react-router-dom";
import styles from "./AccountCard.module.css";

export default function AccountCard({ user }) {
    function renderProfilePicture() {
        if (user.picture) {
            return (
                <img
                    src={`data:image/jpeg;base64,${user.picture}`}
                    className="img-fluid rounded-start"
                    alt={user.username}
                />
            );
        }

        return (
            <img
                src="/images/profile.jpg"
                className="img-fluid rounded-start"
                alt={user.username}
            />
        );
    }

    return (
        <Link className={`card ${styles["account-card"]} text-reset text-decoration-none mb-4`} to={`/accounts/${user.username}`}>
            <div className="row g-0">
                <div className="col-6 col-sm-4 col-md-2 d-flex align-items-center justify-content-center">
                    <div>
                        {renderProfilePicture()}
                    </div>
                </div>
                <div className="col-6 col-sm-8 col-md-10 row">
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <p className="card-text text-center">{user.username}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}