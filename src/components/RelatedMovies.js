import React from "react";
import MovieCard from "./MovieCard";
import { Col, Row } from "react-bootstrap";

const RelatedMovies = ({ data }) => {
  return (
    <div>
      <Row xs={2}>
        {data.map((movie) => (
          <Col className="detailContainer">
            <MovieCard item={movie}></MovieCard>
            <div className="related-movie-card-row"></div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RelatedMovies;
