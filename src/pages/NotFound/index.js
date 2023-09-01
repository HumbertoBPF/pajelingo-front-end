import { Row } from "react-bootstrap";

export default function NotFound() {
  return (
    <Row className="justify-content-center" xs={2} sm={2} md={3}>
      <div data-testid="not-found">
        <img
          src="/images/not_found.png"
          className="img-fluid rounded"
          alt="Not found"
          data-testid="not-found-image"
        />
        <p>The page you are trying to access does not exist or was removed</p>
      </div>
    </Row>
  );
}
