export default function Checkbox({ id, name, value, children, onChange=((target) => {}) }) {
    return (
        <div className="form-check">
            <input 
                id={id}
                className="form-check-input" 
                type="checkbox" 
                name={name} 
                value={value} 
                onChange={(event) => onChange(event.target)}/>
            <label className="form-check-label" htmlFor={id}>{children}</label>
        </div>
    )
}