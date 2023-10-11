import React, { useState } from "react";
import {
  Nav,
  NavDropdown,
  Navbar,
  Container,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { movieAction } from "./../redux/actions/MovieAction";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const doMovieSearch = (event) => {
    event.preventDefault();
    console.log("doSearch");
    dispatch(movieAction.searchByKeyword(keyword));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="black" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            width={150}
            src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-item-home">
              Home
            </Link>
            <Link to="/movies" className="nav-item">
              Movies
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={(event) => doMovieSearch(event)}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Button variant="danger" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
