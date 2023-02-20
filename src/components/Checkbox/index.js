export default function Checkbox({ id, name, value, children }) {
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" name={name} value={value} id={id}/>
            <label className="form-check-label" htmlFor={id}>{children}</label>
        </div>
    )
}