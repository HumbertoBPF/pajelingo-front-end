import { useState } from "react"

export default function FloatingLabelInput({ id, name, type, label, initialValue="", required=false, 
        onChange=((target)=>{}), validators=[] }) {
    const [errors, setErrors] = useState([]);
    const [value, setValue] = useState(initialValue);

    function validate(target) {
        let errorList = [];
        validators.forEach(validator => {
            if (!validator.validate(target)) {
                errorList.push(validator.errorMessage)
            }
        });
        setErrors(errorList);
    }

    return (
        <div className="form-floating mb-4">
            <input 
                id={id} 
                type={type} 
                className={(errors.length === 0)?"form-control":"form-control is-invalid"} 
                name={name} 
                placeholder={label} 
                value={value}
                required={required}
                onChange={
                    (event) => {
                        setValue(event.target.value);
                        onChange(event.target);
                    }
                }
                onInput={
                    (event) => validate(event.target)
                }
                onFocus={
                    (event) => validate(event.target)
                }
                />
            <label htmlFor={id}>{label}</label>
            <div className="invalid-feedback mt-4">
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
        </div>
    )
}