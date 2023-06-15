import { useNavigate } from "react-router-dom";
import styles from "./GameCard.module.css";
import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export default function GameCard({ game }) {
  const navigate = useNavigate();

  return (
    <Card
      className={`${styles["game-card"]} mb-4`}
      onClick={() => navigate(`${game.link}setup`)}>
      <Row className="g-0">
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={4}
          md={3}
          lg={2}>
          <img
            src={`data:image/jpeg;base64,${game.image}`}
            className="img-fluid rounded-start"
            alt={game.game_name}
          />
        </Col>
        <Col className="row" xs={8} md={9} lg={10}>
          <Card.Body className="d-flex align-items-center justify-content-center">
            <Card.Text>{game.game_name}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

GameCard.propTypes = {
  game: PropTypes.shape({
    link: PropTypes.string.isRequired,
    game_name: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired
}
