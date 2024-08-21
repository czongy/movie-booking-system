import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function HomeCard({ movie }) {
  return (
    <Button variant="light" href={`/movie/${movie.id}`} className="btn-card">
      <Card style={{ width: "18rem" }} className="movie-card">
        <Card.Img variant="top" src={movie.imageUrl} className="card-img" />
        <div className="card-overlay">
          <Card.Body>
            <Card.Title>{movie.name}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    </Button>
  );
}
