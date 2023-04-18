import { Button, Spinner } from "react-bootstrap";

export default function CustomButton({ className="", type, variant, disabled=false, isLoading=false,
        onClick=((event) => {}), children }) {
    let styles = {}
    
    if (variant === "info") {
        styles = {"color": "white"}
    }

    return (
        <Button 
            className={className} 
            style={styles} 
            type={type} 
            variant={variant} 
            disabled={disabled}
            onClick={(event) => onClick(event)}>
                {isLoading?<Spinner as="span" animation="border" size="sm"/>:null}{children}
        </Button>
    );
}