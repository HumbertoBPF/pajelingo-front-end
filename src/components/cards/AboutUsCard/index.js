import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export default function AboutUsCard({ item }) {
  return (
    <>
      <Card className="mb-4 p-4" data-testid={`${item.id}-about-us-card`}>
        <Row className="g-0">
          <Col
            className="d-flex align-items-center justify-content-center"
            xs={4}
            sm={4}
            md={2}>
            <img
              src={item.image}
              className="img-fluid rounded-start"
              alt={item.alt}
            />
          </Col>
          <Col className="row" xs={8} sm={8} md={10}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <Card.Text>{item.text}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

AboutUsCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }).isRequired
};
