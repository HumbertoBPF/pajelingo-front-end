import { FloatingLabel, Form } from "react-bootstrap";

export default function FloatingLabelInput({ controlId, type, label="", placeholder="", onChange=((event)=>{}) }) {
    return (
        <FloatingLabel controlId={controlId} label={label} className="mb-4" onChange={(event) => onChange(event)}>
            <Form.Control type={type} placeholder={placeholder}/>
        </FloatingLabel>
    );
}