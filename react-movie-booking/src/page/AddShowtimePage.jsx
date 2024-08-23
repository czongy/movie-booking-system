import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom" 
import { Form, Row, Col, Button } from "react-bootstrap"
import axios from "axios";
import { axiosConfig } from "../axios.config";


export default function AddShowtimePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showtime, setShowtime] = useState({
    date: "",
    startTime: "",
    endTime: "",
    hallId: "",
    seatsOccupied: []
  })

  function handleChange(e) {
    const { id, value } = e.target;
    setShowtime({ ...showtime, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(axiosConfig.baseURL + `/showtime/restrict/add/${id}`, showtime, { withCredentials: true })
      .then(response => {
        console.log("Showtime added successfully:", response.data);
        alert("Showtime added successfully");
        return navigate("/admin/movielist");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <Row className="mt-3 mb-3">
        <Form.Group as={Col} controlId="movieId">
          <Form.Label>Movie ID</Form.Label>
          <Form.Control required value={id} disabled/>
        </Form.Group>
        <Form.Group as={Col} controlId="hallId">
        <Form.Label>Hall ID</Form.Label>
          <Form.Select required onChange={handleChange}>
            <option >Select Hall</option>
            <option value="1">Eclipse Hall 1</option>
            <option value="2">Eclipse Hall 2</option>
            <option value="3">Eclipse Hall 3</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="date">
          <Form.Label>Showtime Date</Form.Label>
          <input
            type="date"
            className="form-control"
            name="date"
            id="date"
            onChange={handleChange} 
            value={showtime.date}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="startTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control required onChange={handleChange} value={showtime.startTime} placeholder="HH:MM:SS"/>
        </Form.Group>
        <Form.Group as={Col} controlId="endTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control required onChange={handleChange} value={showtime.endTime} placeholder="HH:MM:SS"/>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>
    </form>
  )
}
