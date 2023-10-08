import React, { useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/MovieAction";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { selectedMovie, genreList } = useSelector((state) => state.movie);

  let { id } = useParams();

  useEffect(() => {
    dispatch(movieAction.getMovieDetail(id));
  }, []);

  return (
    <div className="movieDetailBg">
      <Container>
        <Row>
          <Col className="movie-image">
            <img
              src={
                selectedMovie
                  ? "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
                    selectedMovie.poster_path
                  : ""
              }
            ></img>
          </Col>
          <Col className="detailpage-infobox">
            <Row>
              <Col className="detailpage-genres">
                {selectedMovie?.genres.map((item, index) => (
                  <Badge
                    key={index}
                    pill
                    bg="danger"
                    style={{ marginRight: "1.5em" }}
                  >
                    {genreList.find((genre) => genre.id == item.id).name}
                  </Badge>
                ))}
              </Col>
            </Row>
            <Row className="detailpage-title">{selectedMovie?.title}</Row>
            <Row className="detailpage-tagline">{selectedMovie?.tagline}</Row>
            <Row className="detailpage-imdbline">
              <Col xs={1}>
                <img
                  width={20}
                  height={20}
                  src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                ></img>
              </Col>
              <Col xs={2} className="detailpage-imdbscore">
                <div>{selectedMovie?.vote_average}</div>
              </Col>
              <Col xs={1}>
                <img
                  width={20}
                  height={20}
                  src="https://png.pngtree.com/png-vector/20220608/ourlarge/pngtree-multiple-users-chat-group-avatar-png-image_4816385.png"
                ></img>
              </Col>
              <Col xs={3} className="detailpage-imdbscore">
                {selectedMovie?.popularity}
              </Col>
              <Col xs={1} className="detailpage-adult">
                {selectedMovie ? "Under18" : "Adult"}
              </Col>
              <Col xs={4}></Col>
            </Row>
            <Row className="detailpage-overview">{selectedMovie?.overview}</Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetail;
