import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { axiosConfig } from "../axios.config";
import UserContext from "../context/UserContext";

export default function NavigationBar() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navclass =
    location.pathname.match(/^\/movie\/[^/]+\/[^/]+$/) && "custom-min-width";

  async function handleChange(value) {
    setInput(value);
    if (value.length < 2) {
      setSearchResults([]);
    } else {
      try {
        const response = await axios.get(
          axiosConfig.baseURL + `/movie/search?keyword=${value}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }

  return (
    <Navbar expand="md" className={`bg-body-tertiary ${navclass}`}>
      <div className="container-fluid">
        <Navbar.Brand href="/" className="text-primary fw-bold">
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
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            ) : (
              <>
                {user.role === "[ROLE_ADMIN]" && (
                  <>
                    <Nav.Link href="/admin/addmovie">Add movie</Nav.Link>
                    <Nav.Link href="/admin/movielist">Movie List</Nav.Link>
                    <Nav.Link href="/admin/bookinglist">Booking List</Nav.Link>
                  </>
                )}
                {user.role === "[ROLE_USER]" && (
                  <Nav.Link href="/user/booking">
                    <span className="username">{user.username}</span>
                  </Nav.Link>
                )}
                <Nav.Link href="/logout">Logout</Nav.Link>
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
                    <a href={`/movie/${result.id}`} className="nav-search-link">
                      <span>{result.name}</span>
                    </a>
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
