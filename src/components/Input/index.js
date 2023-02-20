export default function Input({ id, name, type, label }) {
    return (
        <div className="form-floating mb-4">
            <input id={id} type={type} className="form-control" name={name} placeholder={label}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}