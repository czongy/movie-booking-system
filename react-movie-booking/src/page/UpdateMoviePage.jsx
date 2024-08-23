import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { axiosConfig } from "../axios.config";

export default function UpdateMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateMovie, setUpdateMovie] = useState({
    id: null,
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

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + `/movie/${id}`)
      .then((response) => {
        setUpdateMovie(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }, [id]);

  function handleChange(e) {
    const { id, value } = e.target;
    setUpdateMovie({ ...updateMovie, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(axiosConfig.baseURL + `/movie/restrict/update/${id}`, updateMovie, { withCredentials: true })
      .then((response) => {
        console.log("Movie updated successfully:", response.data);
        alert("Movie updated successfully");
        navigate("/admin/movielist");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDelete() {
    axios
      .delete(axiosConfig.baseURL + `/movie/restrict/delete/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("Movie deleted successfully:", response.data);
        alert("Movie deleted successfully");
        return navigate("/admin/movielist");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <form className="container" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="name" className="mt-3 mb-3">
          <Form.Label>Movie Name</Form.Label>
          <Form.Control onChange={handleChange} value={updateMovie.name} />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="movieCast">
            <Form.Label>Movie Casts</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={updateMovie.movieCast}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="movieDirector">
            <Form.Label>Movie Director</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={updateMovie.movieDirector}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Movie Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={handleChange}
            value={updateMovie.description}
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
              value={updateMovie.releaseDate}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="movieDuration">
            <Form.Label>Movie Duration</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={updateMovie.movieDuration}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="language">
            <Form.Label>Movie Language</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={updateMovie.language}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="rating">
            <Form.Label>Movie Rating</Form.Label>
            <Form.Control onChange={handleChange} value={updateMovie.rating} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="genre">
            <Form.Label>Movie Genre</Form.Label>
            <Form.Control onChange={handleChange} value={updateMovie.genre} />
          </Form.Group>
          <Form.Group as={Col} controlId="imageUrl">
            <Form.Label>Movie Image Url</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={updateMovie.imageUrl}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="mb-3">
          Submit
        </Button>

        <Button variant="danger" className="ms-3 mb-3" onClick={handleDelete}>
          Delete
        </Button>
      </form>
    </>
  );
}
