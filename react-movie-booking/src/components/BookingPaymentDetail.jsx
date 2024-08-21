import { Card, Button, Row, Col, Form } from "react-bootstrap";

export default function BookingPaymentDetail({ handleSubmit, selectedPayment }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Payment Details</Card.Title>
        <Form>
          <Row className="mt-3 mb-3">
            <Form.Group as={Col} controlId="formGridCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCVC">
              <Form.Label>CVC</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCardName">
              <Form.Label>Card Holder Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Row>

          {selectedPayment && (
            <Button onClick={handleSubmit} className="custom-payment-btn">
              Confirm
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}
