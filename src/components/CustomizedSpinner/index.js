import { Spinner } from "react-bootstrap";
import styles from "./CustomizedSpinner.module.css";

export default function CustomizedSpinner() {
    return (
        <Spinner className={`${styles["spinner"]}`} animation="border"/>
    );
}