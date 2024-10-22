import { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import UserContext from "../context/UserContext";

export default function NavigationBar() {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navclass =
    location.pathname.match(/^\/movie\/[^/]+\/[^/]+$/) && "custom-min-width";

 function handleChange(value) {
    if (value.length < 2) {
      setSearchResults([]);
    } else {
      axios
        .get(axiosConfig.baseURL + `/movie/search?keyword=${value}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    setInput(value);
  }

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${navclass}`}>
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/" className="text-primary fw-bold">
          <img
            alt=""
            src="/company-logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Eclipse Cinemas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                {user.role === "[ROLE_ADMIN]" && (
                  <>
                    <Link to="/admin/addmovie">Add movie</Link>
                    <Link to="/admin/movielist">Movie List</Link>
                    <Link to="/admin/bookinglist">Booking List</Link>
                  </>
                )}
                {user.role === "[ROLE_USER]" && (
                  <Link to="/user/booking">
                    <span className="username">{user.username}</span>
                  </Link>
                )}
                <Link to="/logout">Logout</Link>
              </>
            )}
          </Nav>
          <Form className="d-flex nav-search">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
            {searchResults.length > 0 && (
              <ul className="nav-list-group">
                {searchResults.map((result) => (
                  <li key={result.id} className="nav-list-item">
                    <Link to={`/movie/${result.id}`} className="nav-search-link">
                      <span>{result.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
