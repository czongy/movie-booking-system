import { useEffect, useState } from "react"
import axios from "axios";
import { axiosConfig } from "../axios.config";
import { Table, Accordion } from "react-bootstrap";
import AdminHistoryBooking from "../components/AdminHistoryBooking";

export default function AdminHistoryPage() {
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
            <Table className="custom-admin-table text-center">
              <thead>
                <tr>
                  <td scope="col" className="col-1">{movie["id"]}</td>
                  <td scope="col" className="col-3">{movie["name"]}</td>
                  <td scope="col" className="col-3">{movie["releaseDate"]}</td>
                  <td scope="col" className="col-2">{movie["language"]}</td>
                  <td scope="col" className="col-3">{movie["genre"]}</td>
                  {/* <td scope="col" className="col-3">Total seats booked: {info}</td>
                  <td scope="col" className="col-3">Total revenue: ${info * 15}</td> */}
                </tr>
              </thead>
            </Table>
          </Accordion.Header>
          <Accordion.Body>
            <AdminHistoryBooking movieId={movie.id} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

