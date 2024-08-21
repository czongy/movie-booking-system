import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap"
import axios from "axios";
import { axiosConfig } from "../axios.config";

export default function AddMoviePage() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: "",
    movieCast: "",
    movieDirector: "",
    description: "",
    releaseDate: "",
    movieDuration: "",
    language: "",
    rating: "",
    genre: "",
    imageUrl: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setMovie({ ...movie, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(axiosConfig.baseURL + "/movie/restrict/add", movie)
      .then((response) => {
        console.log("Movie added successfully:", response.data);
        alert("Movie added successfully");
        return navigate("/admin/movielist");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group controlId="name" className="mt-3 mb-3">
        <Form.Label>Movie Name</Form.Label>
        <Form.Control required onChange={handleChange} value={movie.name} />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="movieCast">
          <Form.Label>Movie Casts</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            value={movie.movieCast}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="movieDirector">
          <Form.Label>Movie Director</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            value={movie.movieDirector}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Movie Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          required
          onChange={handleChange}
          value={movie.description}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="releaseDate">
          <Form.Label>Movie Release Date</Form.Label>
          <input
            type="date"
            className="form-control"
            name="releaseDate"
            id="releaseDate"
            onChange={handleChange}
            value={movie.releaseDate}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="movieDuration">
          <Form.Label>Movie Duration</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            value={movie.movieDuration}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="language">
          <Form.Label>Movie Language</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            value={movie.language}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="rating">
          <Form.Label>Movie Rating</Form.Label>
          <Form.Control required onChange={handleChange} value={movie.rating} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="genre">
          <Form.Label>Movie Genre</Form.Label>
          <Form.Control required onChange={handleChange} value={movie.genre} />
        </Form.Group>
        <Form.Group as={Col} controlId="imageUrl">
          <Form.Label>Movie Image Url</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            value={movie.imageUrl}
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>
    </form>
  );
}
