import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export default function AboutUsCard({ image, children }) {
  return (
    <>
      <Card className="mb-4 p-4">
        <Row className="g-0">
          <Col
            className="d-flex align-items-center justify-content-center"
            xs={4}
            sm={4}
            md={2}>
            <img
              src={image}
              className="img-fluid rounded-start"
              alt="Welcome to Pajelingo"
            />
          </Col>
          <Col className="row" xs={8} sm={8} md={10}>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <Card.Text>{children}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

AboutUsCard.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};
