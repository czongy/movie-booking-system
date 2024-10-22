import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function HomeCard({ movie }) {
  return (
    <Button as={Link} variant="light" to={`/movie/${movie.id}`} className="btn-card">
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
