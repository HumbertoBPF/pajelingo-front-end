import { useNavigate } from "react-router-dom";
import styles from "./AccountCard.module.css";
import { Card, Col, Ratio, Row } from "react-bootstrap";
import { showFirstCharacters } from "utils";
import PropTypes from "prop-types";

export default function AccountCard({ user }) {
  const navigate = useNavigate();

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
        src="/images/profile.png"
        className="img-fluid rounded-start"
        alt={user.username}
      />
    );
  }

  return (
    <Card
      className={`${styles["account-card"]} mb-4`}
      onClick={() => navigate(`/accounts/${user.username}`)}>
      <Row className="g-0">
        <Col sm={3} md={2}>
          <Ratio aspectRatio="1x1">{renderProfilePicture()}</Ratio>
        </Col>
        <Col className="row" sm={9} md={10}>
          <div className="d-flex align-items-center justify-content-center">
            <Card.Body>
              <Card.Text>{user.username}</Card.Text>
              <Card.Text>
                <strong className="text-secondary">Bio:</strong>
                <span className="text-secondary text-opacity-20">
                  {" "}
                  {showFirstCharacters(user.bio, 75)}
                </span>
              </Card.Text>
            </Card.Body>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

AccountCard.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string,
    username: PropTypes.string.isRequired,
    bio: PropTypes.string
  }).isRequired
};
