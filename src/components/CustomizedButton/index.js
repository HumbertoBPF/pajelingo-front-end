import { Button } from "react-bootstrap";

export default function CustomizedButton({ type, variant, onClick=((event) => {}), children }) {
    let styles = {}
    
    if (variant === "info") {
        styles = {"color": "white"}
    }

    return (
        <Button style={styles} type={type} variant={variant} onClick={(event) => onClick(event)}>{children}</Button>
    );
}