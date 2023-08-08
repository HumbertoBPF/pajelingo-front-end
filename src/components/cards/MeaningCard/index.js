import { Card } from "react-bootstrap";
import styles from "./MeaningCard.module.css";
import PropTypes from "prop-types";

export default function MeaningCard({ index = null, meaning }) {
  return (
    <Card
      className={`mb-4 ${styles["meaning-card"]}`}
      data-testid={`${meaning.id}-meaning-card`}>
      <Card.Body>
        <Card.Text>
          Meaning{index === null ? "" : ` number ${index}`}: {meaning.meaning}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

MeaningCard.propTypes = {
  index: PropTypes.number,
  meaning: PropTypes.shape({
    id: PropTypes.number,
    meaning: PropTypes.string,
    word: PropTypes.number
  }).isRequired
};
