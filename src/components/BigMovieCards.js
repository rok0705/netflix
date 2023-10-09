import React, { useEffect } from "react";
import BigMovieCard from "./BigMovieCard";
import { Row, Col, Container } from "react-bootstrap";

const BigMovieCards = ({ data }) => {
  useEffect(() => {
    console.log("bigMovieCard:", data);
  }, [data]);

  return (
    <div>
      <Container>
        <Row xs={2}>
          {data &&
            data.results?.map((movie, index) => (
              <Col>
                <BigMovieCard key={index} movie={movie}>
                  1
                </BigMovieCard>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default BigMovieCards;
