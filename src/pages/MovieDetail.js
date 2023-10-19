import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/MovieAction";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import ReviewCards from "../components/ReviewCards";
import { useLocation } from "react-router-dom";
import RelatedMovies from "./../components/RelatedMovies";
import YouTube from "react-youtube";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdLocalMovies } from "react-icons/md";

const MovieDetail = () => {
  const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];

  const dispatch = useDispatch();
  const { selectedMovie, genreList, movieReviews, relatedMovies, trailerId } =
    useSelector((state) => state.movie);
  const [isOpen, setOpen] = useState(false);
  const [isVideoId, setVideoId] = useState("");
  const { pathname } = useLocation();
  const [reviewClicked, setReviewClicked] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);
  const [fullscreen, setFullscreen] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    console.log("useEffect call!");
    window.scrollTo(0, 0);
    dispatch(movieAction.getMovieDetail(id));
    //getVideoId();
  }, [id]);

  function searchGenreName(id) {
    var i = 0;
    for (i = 0; i < genreList.length; i++) {
      if (genreList[i].id == id) {
        return genreList[i].name;
      }
    }
  }

  const getVideoId = async () => {
    setOpen(true);
    const keyword = selectedMovie?.title;
    const API_KEY = "AIzaSyDB8_rpqqkMjDutxRNwTErD3Mp5IpjG0k4";
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${keyword}&key=${API_KEY}`
    );
    const videoId =
      response.data.items[0]?.id?.videoId ||
      "No video found with given keyword";
    setVideoId(videoId);
    console.log("isVideoId:", isVideoId);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  function MyVerticallyCenteredModal(props) {
    const opts = {
      height: "680",
      width: "1150",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const onPlayerReady = (event) => {};

    return (
      <Modal {...props} size="xl" centered>
        <div className="Btn-container">
          <AiFillCloseCircle className="closeButton" onClick={props.onHide} />
        </div>
        <YouTube videoId={trailerId} opts={opts} onReady={onPlayerReady} />
      </Modal>
    );
  }

  const startYoutube = (breakpoint) => {
    setModalShow(true);
    setFullscreen(breakpoint);
  };

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
                    {searchGenreName(item.id)}
                    {/* {genreList?.find((genre) => genre.id == item.id).name} */}
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
            <hr className="detailpage-line"></hr>
            <Row className="detailpage-overview">{selectedMovie?.overview}</Row>
            <hr className="detailpage-line"></hr>
            <Row>
              <Col xs={2} className="detailpage-item">
                <Badge pill bg="danger">
                  Budget
                </Badge>
              </Col>
              <Col xs={1}>
                <div className="detailpage-whiteText">
                  ${selectedMovie?.budget}
                </div>
              </Col>
              <Col xs={9}></Col>
            </Row>
            <Row>
              <Col xs={2} className="detailpage-item">
                <Badge pill bg="danger">
                  Revenue
                </Badge>
              </Col>
              <Col xs={1}>
                <div className="detailpage-whiteText">
                  ${selectedMovie?.revenue}
                </div>
              </Col>
              <Col xs={9}></Col>
            </Row>
            <Row>
              <Col xs={2} className="detailpage-item">
                <Badge pill bg="danger">
                  Release Day
                </Badge>
              </Col>
              <Col xs={3}>
                <div className="detailpage-whiteText">
                  {selectedMovie?.release_date}
                </div>
              </Col>
              <Col xs={7}></Col>
            </Row>
            <Row>
              <Col xs={2} className="detailpage-item">
                <Badge pill bg="danger">
                  Time
                </Badge>
              </Col>
              <Col xs={3}>
                <div className="detailpage-whiteText">
                  {selectedMovie?.runtime}m
                </div>
              </Col>
              <Col xs={7}></Col>
            </Row>
            <hr className="detailpage-line"></hr>
            <Row className="detailpage-whiteText">
              <Col xs={2}>
                <Row>
                  <Button
                    variant="danger"
                    onClick={() => startYoutube("xl-down")}
                  >
                    <MdLocalMovies size={20} />
                    Watch Trailer
                    {/* {typeof v === "string" && `below ${v.split("_")[0]}`} */}
                  </Button>

                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Row>
              </Col>
              <Col xs={10}></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Row className="reviewButtons">
            <Col xs={2}>
              <Button
                variant="light"
                className="review-button"
                onClick={() => setReviewClicked(true)}
              >
                REVIEWS {"("}
                {movieReviews.length}
                {")"}
              </Button>
            </Col>
            <Col xs={2}>
              <Row>
                <Button
                  variant="danger"
                  className="related-movies-button"
                  onClick={() => setReviewClicked(false)}
                >
                  RELATED MOVIES {"("}
                  {relatedMovies.length}
                  {")"}
                </Button>
              </Row>
            </Col>
            <Col xs={8}></Col>
          </Row>
          <Row>
            {movieReviews && reviewClicked && (
              <ReviewCards data={movieReviews}></ReviewCards>
            )}
          </Row>
          <Row>
            {relatedMovies && !reviewClicked && (
              <RelatedMovies data={relatedMovies}></RelatedMovies>
            )}
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetail;
