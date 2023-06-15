import { Card } from "react-bootstrap";
import styles from "./MeaningCard.module.css";
import PropTypes from "prop-types";

export default function MeaningCard({ index = null, meaning }) {
  return (
    <Card className={`mb-4 ${styles["meaning-card"]}`}>
      <Card.Body>
        <Card.Text>
          Meaning{index === null ? "" : ` number ${index}`}: {meaning}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

MeaningCard.propTypes = {
  index: PropTypes.number,
  meaning: PropTypes.string
}
