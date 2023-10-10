import React, { useEffect, useState } from "react";
import BigMovieCard from "./BigMovieCard";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "./../redux/actions/MovieAction";

const BigMovieCards = ({ data, minValue, maxValue, refresh }) => {
  const dispatch = useDispatch();
  const { updatedMovies } = useSelector((state) => state.movie);

  let originalMovies = Object.assign({}, "");
  const [initial, setInitial] = useState(true);
  const [ready, setReady] = useState(false);

  function filterByYear(movie) {
    let year = movie.release_date.split("-")[0];
    if (year <= maxValue && year >= minValue) {
      return movie;
    }
  }

  useEffect(() => {
    setInitial(false);
  }, []);

  useEffect(() => {
    console.log("refresh:", refresh);
    if (refresh) {
      setReady(false);
    }
  }, [refresh]);

  useEffect(() => {
    originalMovies = Object.assign({}, data);
  }, [data && !initial]);

  useEffect(() => {}, [originalMovies]);

  useEffect(() => {
    if (!data) return;
    if (data.results === undefined) return;

    var filteredMovies = data.results.filter(filterByYear);
    //data.results = filteredMovies;
    originalMovies.results = filteredMovies;
    setReady(true);
    console.log("data vs. originalMoviess:", data, originalMovies);
    dispatch(movieAction.updatedMovies(originalMovies));
  }, [minValue, maxValue]);

  useEffect(() => {
    console.log("updatedList:", updatedMovies);
  }, [updatedMovies]);

  if (ready) {
    return (
      <div>
        <Container>
          <Row xs={2} className="movieCols">
            {updatedMovies?.results &&
              updatedMovies?.results?.map((movie, index) => (
                <Col>
                  <BigMovieCard key={index} movie={movie}></BigMovieCard>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <Row xs={2} className="movieCols">
            {data.results &&
              data?.results?.map((movie, index) => (
                <Col>
                  <BigMovieCard key={index} movie={movie}></BigMovieCard>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    );
  }
};

export default BigMovieCards;
