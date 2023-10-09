import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const BigMovieCard = ({ movie }) => {
  return (
    <div
      className="bigCard"
      style={{
        backgroundImage:
          "url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2" +
          `${movie.backdrop_path}` +
          ")",
      }}
    >
      <div>
        <Container>
          <Row className="movieFirstRow">
            <Col xs={4}>
              <img
                width={50}
                src={
                  "https://www.themoviedb.org/t/p/w260_and_h390_bestv2" +
                  `${movie.poster_path}`
                }
              ></img>
            </Col>
            <Col xs={8}>
              <Row className="movieTitle">{movie.title}</Row>
              <Row className="movieReleasedate">
                {movie.release_date.split("-")[0]}
              </Row>
            </Col>
          </Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
        </Container>
      </div>
    </div>
  );
};

export default BigMovieCard;
