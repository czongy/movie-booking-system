import { useState, useEffect } from "react";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import { Table } from "react-bootstrap";

export default function AdminHistoryBooking({ movieId }) {
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
  }, [movieId]);

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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
