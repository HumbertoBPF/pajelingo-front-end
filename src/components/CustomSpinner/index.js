import { Spinner } from "react-bootstrap";
import styles from "./CustomSpinner.module.css";

export default function CustomSpinner() {
  return (
    <Spinner
      className={`${styles["spinner"]}`}
      animation="border"
      data-testid="spinner"
    />
  );
}
