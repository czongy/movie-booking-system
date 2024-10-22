import { useState, useEffect } from "react";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminMovieShowtime({ movieId }) {
  const [showtime, setShowtime] = useState([]);
  const [keyList, setKeyList] = useState([]);

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + `/showtime/movieId?movieId=${movieId}`)
      .then((response) => {
        setShowtime(response.data);
        setKeyList(Object.keys(response.data[0]));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [movieId]);

  return (
    <Table>
      <thead>
        <tr>
          {Array.from({ length: 5 }).map((_, index) => (
            <th key={index}>{keyList[index]}</th>
          ))}
          <th scope="col" className="col-1">Action </th>
          <th scope="col" className="col-1">
            <Button className="custom-admin-btn" as={Link} to={`/admin/addshowtime/${movieId}`}>Add</Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {showtime.map((item) => (
          <tr key={item.id}>
            {Array.from({ length: 5 }).map((_, i) => (
              <td key={i}>{item[keyList[i]]}</td>
            ))}
            <td>
              <Link to={`/admin/updateshowtime/${item.id}`}>Update</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
