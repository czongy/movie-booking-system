import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import BookingSeatsLayout from "../components/BookingSeatsLayout";
import BookingDetail from "../components/BookingDetail";
import BookingPaymentCard from "../components/BookingPaymentCard";
import BookingPaymentDetail from "../components/BookingPaymentDetail";
import UserContext from "../context/UserContext";

export default function BookingPage() {
  const { stid } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [movie, setMovie] = useState({});
  const [showtime, setShowtime] = useState({});
  const [occupied, seatsOccupied] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");

  const totalCost = selectedSeats.length * 15;

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + `/showtime/showId?showtimeId=${stid}`)
      .then((response) => {
        setShowtime(response.data);
        setMovie(response.data.movie);
        seatsOccupied(response.data.seatsOccupied);
      })
      .catch((error) => {
        console.log(error.response.data);
        return navigate("/");
      });
  }, [stid, navigate]);

  function handleSeatClick(seat) {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  }

  function handlePaymentClick(payment) {
    setSelectedPayment((prevSelectedPayment) => {
      if (prevSelectedPayment == payment) {
        return "";
      } else {
        return payment;
      }
    });
  }

  function handleSubmit() {
    const bookingObject = {
      userId: user.userId,
      showtimeId: stid,
      selectedSeats: selectedSeats,
      totalCost: totalCost,
      payment: selectedPayment,
    };

    const fetchData = async () => {
      axios
        .post(axiosConfig.baseURL + `/booking/restrict/add/${stid}`, bookingObject)
        .then(() => {
          alert(
            "Thank you for your purchase! Your payment has been successfully processed."
          );
          return navigate("/");
        })
        .catch ((error) => {
        console.log(error.response.data);
        return navigate("/");
      })
    };
    fetchData();
  }

  return (
    <Container className="custom-container">
      <Row className="justify-content-evenly mt-4 custom-margin">
        <Col md={12} className="custom-layout-container">
          <BookingSeatsLayout
            selectedSeats={selectedSeats}
            occupied={occupied}
            handleSeatClick={handleSeatClick}
          />
        </Col>
        <Col md={12} className="custom-card-container">
          <BookingDetail
            movie={movie}
            showtime={showtime}
            selectedSeats={selectedSeats}
            totalCost={totalCost}
          />
        </Col>
        {selectedSeats.length !== 0 && (
          <Col md={12} className="custom-card-container">
            <BookingPaymentCard
              handlePaymentClick={handlePaymentClick}
              selectedPayment={selectedPayment}
            />
          </Col>
        )}
        {selectedSeats.length !== 0 && selectedPayment.length !== 0 && (
          <Col md={12} className="custom-card-container">
            <BookingPaymentDetail
              handleSubmit={handleSubmit}
              selectedPayment={selectedPayment}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}
