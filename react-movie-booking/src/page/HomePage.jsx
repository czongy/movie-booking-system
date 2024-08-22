import { useState, useEffect } from "react";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import HomeCard from "../components/HomeCard";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(axiosConfig.baseURL + "/movie")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div className="home-container">
      {movies.length > 0 ? (
        movies.map((movie) => <HomeCard key={movie.id} movie={movie} />)
      ) : (
        <img
          src="/broken-link.png"
          alt="Not Available"
          className="center-img"
        />
      )}
    </div>
  );
}
