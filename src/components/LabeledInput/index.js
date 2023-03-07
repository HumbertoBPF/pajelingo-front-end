export default function LabeledInput({ id, name, type, label, disabled=false, placeholder="", onChange=((target)=>{}) }) {
    return (
        <div className="mb-4 row">
            <label htmlFor={name} className="col-5 col-sm-3 col-lg-2 col-form-label">{label}</label>
            <div className="col-7 col-sm-9 col-lg-10">
                <input 
                    id={id} 
                    type={type} 
                    className="text-center form-control" 
                    name={name} 
                    onChange={(event) => onChange(event.target)}
                    disabled={disabled}
                    placeholder={placeholder}/>
            </div>
        </div>
    );
}
