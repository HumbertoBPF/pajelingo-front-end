export default function FloatingLabelInput({ id, name, type, label, onChange=((target)=>{}) }) {
    return (
        <div className="form-floating mb-4">
            <input id={id} type={type} className="form-control" name={name} placeholder={label} onChange={
                (event) => onChange(event.target)
            }/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}