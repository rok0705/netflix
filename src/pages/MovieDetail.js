import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/MovieAction";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const movieDetail = useSelector((state) => state.movie.selectedMovie);

  let { id } = useParams();

  useEffect(() => {
    console.log("moviedetail id:", id);
    dispatch(movieAction.getMovieDetail(id));
  }, []);

  return (
    <div className="movieDetailBg">
      <Container>
        <Row>
          <Col className="movie-image">
            <img
              src={
                movieDetail
                  ? "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
                    movieDetail.poster_path
                  : ""
              }
            ></img>
          </Col>
          <Col>
            <Row>1</Row>
            <Row className="detailpage-title">{movieDetail.title}</Row>
            <Row className="detailpage-tagline">{movieDetail.tagline}</Row>
            <Row>4</Row>
            <Row className="detailpage-overview">{movieDetail.overview}</Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetail;
