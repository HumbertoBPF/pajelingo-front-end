export default function GameInput( { id, type, placeholder="", disabled=false, onChange=((value) => {}) } ) {
    return (
        <input 
            id={id} 
            type={type} 
            className="mb-4 text-center form-control" 
            placeholder={placeholder} 
            disabled={disabled}
            onChange={(event) => onChange(event.target.value)}/>
    );
}