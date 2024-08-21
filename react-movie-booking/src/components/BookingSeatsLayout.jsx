import { Row, Button } from "react-bootstrap";

export default function BookingSeatsLayout({ selectedSeats, occupied, handleSeatClick }) {
  const totalSeats = 60;
  const rows = 6;
  const seatsPerRow = totalSeats / rows;

  function renderSeats() {
    const seatElements = [];
    for (let i = 0; i < rows; i++) {
      const seatRow = [];
      for (let j = 0; j < seatsPerRow; j++) {
        const seatNumber = i * seatsPerRow + j + 1;
        const edgeSeat = seatNumber % 10 === 3 || seatNumber % 10 === 7;
        seatRow.push(
          <Button
            key={seatNumber}
            variant={
              selectedSeats.includes(seatNumber) ? "success" : "outline-primary"
            }
            onClick={() => handleSeatClick(seatNumber)}
            className={
              edgeSeat ? "custom-seat-btn custom-edge-seat" : "custom-seat-btn"
            }
            disabled={occupied.includes(seatNumber)}
          >
            {seatNumber}
          </Button>
        );
      }
      seatElements.push(
        <Row key={i} className="justify-content-center custom-seat-row">
          {seatRow}
        </Row>
      );
    }
    return seatElements;
  }

  return (
    <>
      <h6 className="text-center">Screen</h6>
      <div className="d-flex flex-column align-items-center">
        {renderSeats()}
      </div>
    </>
  );
}
