export default function SelectLanguage({ id, name, items, defaultItem=null, onClick=((value) => {})}) {
    return (
        <div>
            <select id={id} className="form-select" aria-label=".form-select-sm example" name={name} defaultValue="defaultItem">
                { 
                    (defaultItem != null)?
                        <option id="defaultItem" value="">{defaultItem}</option>:
                        null 
                }
                { 
                    items.map( item => 
                        <option key={item.id} 
                                id={`${item.language_name}Item`} 
                                value={item.language_name}
                                onClick={(event) => {
                                    onClick(event.target.value);
                                }}>
                            {item.language_name}
                        </option>) 
                }
            </select>
        </div>
    )
}