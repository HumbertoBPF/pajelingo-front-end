export default function Input({ id, name, type, children }) {
    return (
        <div className="form-floating mb-4">
            <input id={id} type={type} className="form-control" name={name} placeholder={children}/>
            <label htmlFor={id}>{children}</label>
        </div>
    )
}