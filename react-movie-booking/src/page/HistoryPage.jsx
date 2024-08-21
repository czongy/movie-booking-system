import { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import axios from 'axios';
import { axiosConfig } from '../axios.config';
import { Card, Container, Row, Col } from "react-bootstrap"

export default function HistoryPage() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + `/booking/restrict/${user.userId}`)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
  }, [user.userId]);

  return (
    <Container>
      {bookings.map((booking, index) => (
        <Card key={index} className='mt-3 mb-3'>
          <Card.Header>
            <Card.Title>{booking.showtime.movie.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {booking.showtime.movie.language} / {booking.showtime.movie.rating}
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>Eclipse Hall {booking.showtime.hallId}</Col>
                <Col>Date: {booking.showtime.date}</Col>
                <Col>Time: {booking.showtime.startTime}</Col>
              </Row>
            </Card.Text>
            <Card.Text>
              <Row>
                <Col>BookingID: {booking.id}</Col>
                <Col>Seats: {booking.selectedSeats.toString()}</Col>
                <Col>Price: ${booking.totalCost}</Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  )
}
