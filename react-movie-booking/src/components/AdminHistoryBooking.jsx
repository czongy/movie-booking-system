import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import { Table, Button } from "react-bootstrap";

export default function AdminHistoryBooking({ movieId }) {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [keyList, setKeyList] = useState([]);

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + `/booking/restrict/movieId?movieId=${movieId}`)
      .then((response) => {
        setBooking(response.data);
        setKeyList(Object.keys(response.data[0]));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId, navigate]);

  function handleDelete(bookingId) {
    axios
      .delete(axiosConfig.baseURL + `/booking/restrict/delete/${bookingId}`)
      .then(() => {
        console.log("Booking deleted successfully:");
        alert("Booking deleted successfully");
        return window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Table className="text-center">
      <thead>
        <tr>
          {Array.from({ length: 5 }).map((_, index) => (
            <th key={index}>{keyList[index]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {booking.map((item) => (
          <tr key={item.id}>
            {Array.from({ length: 5 }).map((_, i) => (
              <td key={i}>{item[keyList[i]].toString()}</td>
            ))}
            <td>        
              <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
