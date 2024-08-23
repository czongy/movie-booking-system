import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { axiosConfig } from "../axios.config";

export default function UpdateSTPage() {
  const { stid } = useParams();
  const navigate = useNavigate();
  const [updateShowtime, setUpdateShowtime] = useState({
    id: null,
    date: "",
    startTime: "",
    endTime: "",
    hallId: "",
    movie: {id: ""},
    seatsOccupied: []
  })

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + `/showtime/showId?showtimeId=${stid}`)
      .then(response => {
        setUpdateShowtime(response.data);
      })
      .catch (error => {
        console.log(error.response.data);
        alert(error.response.data);
      })
  }, [stid]);

  function handleChange(e) {
    const { id, value } = e.target;
    setUpdateShowtime({ ...updateShowtime, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(axiosConfig.baseURL + `/showtime/restrict/update/${stid}`, updateShowtime, { withCredentials: true })
      .then(response => {
        console.log("Showtime updated successfully:", response.data);
        alert("Showtime updated successfully");
        navigate("/admin/movielist");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDelete() {
    axios
      .delete(axiosConfig.baseURL + `/showtime/restrict/delete/${stid}`, { withCredentials: true })
      .then(response => {
        console.log("Showtime deleted successfully:", response.data);
        alert("Showtime deleted successfully");
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
          <Form.Control required disabled value={updateShowtime.movie.id}/>
        </Form.Group>
        <Form.Group as={Col} controlId="hallId">
        <Form.Label>Hall ID</Form.Label>
          <Form.Select required onChange={handleChange} value={updateShowtime.hallId}>
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
            value={updateShowtime.date}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="startTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control required onChange={handleChange} value={updateShowtime.startTime} placeholder="HH:MM:SS"/>
        </Form.Group>
        <Form.Group as={Col} controlId="endTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control required onChange={handleChange} value={updateShowtime.endTime} placeholder="HH:MM:SS"/>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>

      <Button variant="danger" className="ms-3 mb-3" onClick={handleDelete} >
        Delete
      </Button>
    </form>
  )
}
