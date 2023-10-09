import React, { useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const BigMovieCard = ({ movie }) => {
  const { genreList } = useSelector((state) => state.movie);

  function searchGenreName(item) {
    // console.log("item:", item);
    var i = 0;
    for (i = 0; i < genreList.length; i++) {
      if (genreList[i].id == item) {
        return genreList[i].name;
      }
    }
  }

  //   useEffect(() => {
  //     console.log("genreList:", genreList, movie?.genre_ids);
  //   }, [genreList]);

  function truncateOverview(text) {
    if (text.length > 200) {
      var truncated = text.substring(0, 200) + "...";
    } else {
      return text;
    }
    console.log("truncateOverview:", truncated);
    return truncated;
  }

  return (
    <div
      className="bigCard"
      style={{
        backgroundImage:
          "url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
          `${movie.backdrop_path}` +
          ")",
      }}
    >
      <div>
        <Container>
          <Row className="movieFirstRow">
            <Col xs={4}>
              <img
                width={80}
                src={
                  "https://www.themoviedb.org/t/p/w260_and_h390_bestv2" +
                  `${movie.poster_path}`
                }
              ></img>
            </Col>
            <Col xs={8}>
              <Row className="movieTitle2">{movie.title}</Row>
              <Row className="movieReleasedate">
                {movie.release_date.split("-")[0]}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="detailpage-genres">
              {movie.genre_ids.map((item, index) => (
                <Badge
                  key={index}
                  pill
                  bg="danger"
                  style={{ marginRight: "1.5em" }}
                >
                  {searchGenreName(item)}
                </Badge>
              ))}
            </Col>
          </Row>
          <Row className="movieOverview">
            {truncateOverview(movie.overview)}
          </Row>
          <Row className="detailpage-imdbline">
            <Col xs={2}>
              <img
                width={30}
                height={30}
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              ></img>
            </Col>
            <Col xs={2} className="detailpage-imdbscore">
              <div>{movie?.vote_average}</div>
            </Col>
            <Col xs={2}>
              <img
                width={30}
                height={30}
                src="https://png.pngtree.com/png-vector/20220608/ourlarge/pngtree-multiple-users-chat-group-avatar-png-image_4816385.png"
              ></img>
            </Col>
            <Col xs={4} className="detailpage-imdbscore">
              {movie?.popularity}
            </Col>
            <Col xs={1} className="detailpage-adult">
              {movie ? "Under18" : "Adult"}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BigMovieCard;
