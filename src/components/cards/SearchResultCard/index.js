import { useNavigate } from "react-router-dom";
import styles from "./SearchResultCard.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import HeartIcon from "components/icons/HeartIcon";
import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { toggleFavoriteWord } from "api/words";

export default function SearchResultCard({ word, flagImage }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState(word);

  function toogleHeartIcon() {
    if (user) {
      toggleFavoriteWord(user.token, word.id, !result.is_favorite, (data) => {
        if (data !== null) {
          setResult(data);
        }
      });
    }
  }

  return (
    <Col className="my-1" data-testid={`${word.id}-word-card`}>
      <Card className={`${styles["search-card"]}`}>
        {result.is_favorite === null ? null : (
          <HeartIcon
            className={styles["icon-heart"]}
            width="1.5em"
            height="1.5em"
            fill={result.is_favorite}
            onClick={() => toogleHeartIcon()}
          />
        )}
        <Row className="g-0" onClick={() => navigate(`/meanings/${result.id}`)}>
          <Col
            className="px-4 d-flex align-items-center justify-content-center"
            md={4}>
            <img
              src={`data:image/jpeg;base64,${flagImage}`}
              className="img-fluid rounded-start"
              alt={`${result.language} language flag`}
            />
          </Col>
          <Col className="row" md={8}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <Card.Text>{result.word_name}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

SearchResultCard.propTypes = {
  word: PropTypes.shape({
    id: PropTypes.number.isRequired,
    word_name: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }).isRequired,
  flagImage: PropTypes.string
};
