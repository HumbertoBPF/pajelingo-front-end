export default function SelectLanguage({ id, name, items, defaultItem=null }) {
    return (
        <div>
            <select id={id} className="form-select" aria-label=".form-select-sm example" name={name}>
                { (defaultItem != null)?
                    <option id="defaultItem" value="" selected>{defaultItem}</option>:
                    null }
                { items.map( item => <option id={`${item.language_name}Item`} value={item.language_name}>{item.language_name}</option>)}
            </select>
        </div>
    )
}