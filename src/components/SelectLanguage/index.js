import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function SelectLanguage({
  items,
  defaultItem = null,
  onClick = () => {},
  testId = ""
}) {
  return (
    <Form.Select
      className="mb-4"
      defaultValue="defaultItem"
      data-testid={testId}
      onClick={(event) => onClick(event.target)}>
      {defaultItem !== null ? <option value="">{defaultItem}</option> : null}
      {items.map((item) => (
        <option
          key={item.id}
          id={item.language_name}
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
  onClick: PropTypes.func,
  testId: PropTypes.string
};
