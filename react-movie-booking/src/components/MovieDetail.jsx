import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosConfig } from "../axios.config";

export default function MovieDetail() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + `/movie/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        return navigate("/");
      });
  }, [id, navigate]);

  return (
    <div className="movie-details-container">
      <div className="row">
        <div className="col-sm-4 movie-img">
          <img src={movie.imageUrl} alt={movie.name} />
        </div>
        <div className="col-sm-8 movie-text">
          <h4>{movie.name}</h4>
          <h6>Synopsis</h6>
          <span className="">{movie.description}</span>
          <h6>Cast</h6>
          <span>{movie.movieCast}</span>
          <h6>Director</h6>
          <span>{movie.movieDirector}</span>
          <h6>Release Date</h6>
          <span>{formatDate(movie.releaseDate)}</span>
          <div className="row">
            <div className="col-sm-4">
              <h6>Runtime</h6>
              <span>{movie.movieDuration} mins</span>
            </div>
            <div className="col-sm-4">
              <h6>Language</h6>
              <span>{movie.language}</span>
            </div>
            <div className="col-sm-4">
              <h6>Genre</h6>
              <span>{movie.genre}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
}
