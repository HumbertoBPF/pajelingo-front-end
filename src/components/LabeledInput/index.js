import { Col, Form } from "react-bootstrap";

export default function LabeledInput({ controlId, label="", placeholder="", disabled=false, onChange=((event)=>{}) }) {
    return (
        <Form.Group className="mb-4 row" controlId={controlId} onChange={(event) => onChange(event)}>
            <Form.Label className="text-center" column sm="3" lg="2">{label}</Form.Label>
            <Col sm="9" lg="10">
                <Form.Control className="text-center" type="text" placeholder={placeholder} disabled={disabled}/>
            </Col>
        </Form.Group>
    );
}