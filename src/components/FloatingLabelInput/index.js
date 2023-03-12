import { useState } from "react";
import { Form } from "react-bootstrap";

export default function FloatingLabelInput({ controlId, type, label="", placeholder="", defaultValue="", required=false, 
        onChange=((event)=>{}), validators=[] }) {
    const [errors, setErrors] = useState([]);

    function validate(target) {
        let errorList = [];

        validators.forEach(validator => {
            if (!validator.validate(target)) {
                errorList.push(validator.errorMessage);
            }
        });

        setErrors(errorList);
    }

    return (
        <Form.Floating className="mb-4" 
            onChange={(event) => onChange(event)}
            onInput={(event) => validate(event.target)}
            onFocus={(event) => validate(event.target)}>
            <Form.Control 
                id={controlId} 
                className={(errors.length === 0)?"form-control":"form-control is-invalid"}
                type={type} 
                placeholder={placeholder} 
                defaultValue={defaultValue} 
                required={required}/>
            <label htmlFor={controlId}>{label}</label>
            <Form.Control.Feedback className="mt-4" type="invalid">
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </Form.Control.Feedback>
        </Form.Floating>
    );
}