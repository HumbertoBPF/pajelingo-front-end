export default function Input( { id, className=null, type, placeholder="", disabled=false, onChange=((target) => {}) } ) {
    return (
        <input 
            id={id} 
            type={type} 
            className={`form-control${(className !== null)?` ${className}`:""}`}
            placeholder={placeholder} 
            disabled={disabled}
            onChange={(event) => onChange(event.target)}/>
    );
}