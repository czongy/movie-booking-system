import { useEffect, useState } from "react"
import axios from "axios";
import { axiosConfig } from "../axios.config";
import { Table, Accordion, Button } from "react-bootstrap";
import AdminMovieShowtime from "../components/AdminMovieShowtime";
import { Link } from "react-router-dom";

export default function AdminMoviePage() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + "/movie")
      .then((response) => {
        setMovieList(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (    
    <Accordion>
      {movieList.map((movie, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header className="custom-admin-accordion">
            <Table className="custom-admin-table">
              <thead>
                <tr>
                  <td scope="col" className="col-1">
                    <Button as={Link} className="custom-admin-btn" to={`/admin/updatemovie/${movie.id}`}>Update</Button>
                  </td>
                  <td scope="col" className="col-1">{movie["id"]}</td>
                  <td scope="col" className="col-4">{movie["name"]}</td>
                  <td scope="col" className="col-3">Release Date: {movie["releaseDate"]}</td>
                  <td scope="col" className="col-3">Movie Duration: {movie["movieDuration"]} </td>
                </tr>
              </thead>
            </Table>
          </Accordion.Header>
          <Accordion.Body>
            <AdminMovieShowtime movieId={movie.id} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
