import { Card } from "react-bootstrap";
import styles from "./MeaningCard.module.css";

export default function MeaningCard({ index=null, meaning }) {
    return (
        <Card className={`mb-4 ${styles["meaning-card"]}`}>
            <Card.Body>
                <Card.Text>
                    Meaning{(index === null)?"":` number ${index}`}: {meaning.meaning}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}