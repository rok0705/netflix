import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import BigMovieCards from "./../components/BigMovieCards";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "./../redux/actions/MovieAction";

const Movies = () => {
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  return (
    <div className="movieDetailBg">
      <Container>
        <Row>
          <Col xs={4}>
            <Row>SortBox</Row>
            <Row>FilterBox</Row>
          </Col>
          <Col xs={8}>
            <BigMovieCards data={popularMovies}></BigMovieCards>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movies;
