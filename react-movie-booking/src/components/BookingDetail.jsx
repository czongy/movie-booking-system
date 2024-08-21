import { Card } from "react-bootstrap";

export default function BookingDetail({ movie, showtime, selectedSeats, totalCost }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{movie.genre}</Card.Subtitle>
        <Card.Text>
          <strong>Language:</strong> {movie.language}
        </Card.Text>
        <Card.Text>
          <strong>Rating:</strong> {movie.rating}
        </Card.Text>
        <Card.Text>
          <strong>Hall:</strong> Eclipse Hall {showtime.hallId}
        </Card.Text>
        <Card.Text>
          <strong>Date:</strong> {new Date(showtime.date).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>Time:</strong>{" "}
          {showtime.startTime ? showtime.startTime.substring(0, 5) : ""}
        </Card.Text>
        <Card.Text>
          <strong>Selected Seats:</strong>{" "}
          <span>{selectedSeats.join(", ") || "None"}</span>
        </Card.Text>
        <Card.Text>
          <strong>Total Cost:</strong> <span>${totalCost}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
