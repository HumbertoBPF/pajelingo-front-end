import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function SelectLanguage({
  items,
  defaultItem = null,
  onClick = () => {},
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

SelectLanguage.propTypes = {
  items: PropTypes.array.isRequired,
  defaultItem: PropTypes.string,
  onClick: PropTypes.func
}
