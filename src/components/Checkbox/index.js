export default function Checkbox({ id, name, value, children, onChange=((target) => {}) }) {
    return (
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                name={name} 
                value={value} 
                id={id}
                onChange={(event) => onChange(event.target)}/>
            <label className="form-check-label" htmlFor={id}>{children}</label>
        </div>
    )
}