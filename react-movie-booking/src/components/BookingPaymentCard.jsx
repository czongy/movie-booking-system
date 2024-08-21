import { Card, Button, Row, Col } from "react-bootstrap";

export default function BookingPaymentCard({ handlePaymentClick, selectedPayment }) {
  const paymentMethods = [
    "visa",
    "mastercard",
    "googlepay",
    "applepay",
    "amazonpay",
    "alipay",
  ];

  return (
    <Card>
      <Card.Body>
        <Card.Title>Select payment method</Card.Title>
        <Row className="custom-payment-row">
          {paymentMethods.map((method, idx) => (
            <Button
              variant={selectedPayment == method ? "primary" : "light"}
              key={idx}
              onClick={() => handlePaymentClick(method)}
            >
              <Col>
                <Card style={{ width: "10rem" }}>
                  <Card.Img
                    variant="top"
                    src={`/paymentimg/${method}.png`}
                    className="card-img"
                    alt={method}
                  />
                </Card>
              </Col>
            </Button>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}
