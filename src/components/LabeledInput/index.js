import { useState } from "react";
import { Col, Form } from "react-bootstrap";

export default function LabeledInput({ controlId, type, label=null, placeholder="", disabled=false, onChange=((event)=>{}), 
    validators=[]  }) {
    const [errors, setErrors] = useState([]);

    function validate(target) {
        let errorList = [];

        validators.forEach(validator => {
            if (!validator.validate(target)) {
                errorList.push(validator.errorMessage);
            }
        });

        target.setCustomValidity((errorList.length === 0)?"":errorList.toString());
        setErrors(errorList);
    }

    function renderInput(className) {
        return (
            <>
                <Form.Control className={`${(errors.length === 0)?"":" is-invalid"} ${className}`} 
                    type={type} placeholder={placeholder} disabled={disabled}/>
                <Form.Control.Feedback className="mt-4" type="invalid">
                    <ul>
                        {errors.map((error, index) => <li key={index}>{error}</li>)}
                    </ul>
                </Form.Control.Feedback>
            </>
        );
    }

    return (
        <Form.Group className="mb-4 row" controlId={controlId} 
            onInput={(event) => validate(event.target)} 
            onChange={(event) => onChange(event)}>
            {
                (label === null)?
                renderInput():
                <>
                    <Form.Label className="text-center" column sm="3" lg="2">{label}</Form.Label>
                    <Col sm="9" lg="10">
                        {renderInput("text-center")}
                    </Col>
                </>
            }
        </Form.Group>
    );
}