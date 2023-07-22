const { OverlayTrigger, Button, Popover } = require("react-bootstrap");
import PropTypes from "prop-types";

export default function Badge({ badge }) {
  function getPopover(badge) {
    return (
      <Popover id="popover-basic" data-testid={`popover-${badge.id}`}>
        <Popover.Header as="h3">{badge.name}</Popover.Header>
        <Popover.Body>{badge.description}</Popover.Body>
      </Popover>
    );
  }

  return (
    <OverlayTrigger placement="top" overlay={getPopover(badge)}>
      <Button
        style={{
          backgroundColor: `#${badge.color}`,
          borderColor: `#${badge.color}`
        }}
        className="mt-2 ms-2"
        data-testid={`badge-${badge.id}`}>
        {badge.image ? (
          <img src={`data:image/jpeg;base64,${badge.image}`} alt={badge.name} />
        ) : null}
        <span> {badge.name}</span>
      </Button>
    </OverlayTrigger>
  );
}

Badge.propTypes = {
  badge: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  testId: PropTypes.string
};
