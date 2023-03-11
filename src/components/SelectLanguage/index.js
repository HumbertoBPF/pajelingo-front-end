import { Form } from "react-bootstrap";

export default function SelectLanguage({ items, defaultItem=null, onClick=((target) => {})}) {
    return (
        <Form.Select defaultValue="defaultItem">
            { 
                (defaultItem != null)?
                    <option>{defaultItem}</option>:
                    null 
            }
            { 
                items.map( item => 
                    <option key={item.id} 
                            id={`${item.language_name}Item`} 
                            value={item.language_name}
                            onClick={(event) => {
                                onClick(event.target);
                            }}>
                        {item.language_name}
                    </option>) 
            }
        </Form.Select>
    )
}