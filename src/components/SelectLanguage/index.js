import { Form } from "react-bootstrap";

export default function SelectLanguage({
  items,
  defaultItem = null,
  onClick = (target) => {},
}) {
  return (
    <Form.Select
      className="mb-4"
      defaultValue="defaultItem"
      onClick={(event) => onClick(event.target)}>
      {defaultItem != null ? <option value={""}>{defaultItem}</option> : null}
      {items.map((item) => (
        <option
          key={item.id}
          id={`${item.language_name}Item`}
          value={item.language_name}>
          {item.language_name}
        </option>
      ))}
    </Form.Select>
  );
}
