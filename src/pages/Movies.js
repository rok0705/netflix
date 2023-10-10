import React, { useEffect, useState } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import BigMovieCards from "./../components/BigMovieCards";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "./../redux/actions/MovieAction";

const Movies = () => {
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [isPopularDescending, setPopularDescending] = useState(true);
  const [isTopratedDescending, setTopratedDescending] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [objectMovies, setObjectMovies] = useState("");

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  useEffect(() => {
    setObjectMovies(popularMovies);
  }, [popularMovies]);

  const sortPopularMoviesByDesc = (descendingRequest) => {
    if (descendingRequest && isPopularDescending) {
      dispatch(movieAction.reversePopular(popularMovies));
      setObjectMovies(popularMovies);
    } else if (descendingRequest && !isPopularDescending) {
      popularMovies.results.reverse();
      dispatch(movieAction.reversePopular(popularMovies));
      setObjectMovies(popularMovies);
      setPopularDescending(!isPopularDescending);
    } else if (!descendingRequest && !isPopularDescending) {
      dispatch(movieAction.reversePopular(popularMovies));
      setObjectMovies(popularMovies);
    } else {
      popularMovies.results.reverse();
      dispatch(movieAction.reversePopular(popularMovies));
      setPopularDescending(!isPopularDescending);
      setObjectMovies(popularMovies);
    }
  };

  const sortTopRatedMoviesByDesc = (descendingRequest) => {
    if (descendingRequest && isTopratedDescending) {
      dispatch(movieAction.reverseToprated(topRatedMovies));
      setObjectMovies(topRatedMovies);
    } else if (descendingRequest && !isTopratedDescending) {
      topRatedMovies.results.reverse();
      dispatch(movieAction.reverseToprated(topRatedMovies));
      setObjectMovies(topRatedMovies);
      setTopratedDescending(!isTopratedDescending);
    } else if (!descendingRequest && !isTopratedDescending) {
      dispatch(movieAction.reverseToprated(topRatedMovies));
      setObjectMovies(topRatedMovies);
    } else {
      topRatedMovies.results.reverse();
      dispatch(movieAction.reverseToprated(topRatedMovies));
      setTopratedDescending(!isTopratedDescending);
      setObjectMovies(topRatedMovies);
    }
  };
  // const sortTopRatedMoviesByDesc = (descendingRequest) => {
  //   if (descendingRequest && isTopratedDescending) {
  //     console.log("topRatedMovies:", topRatedMovies);
  //     dispatch(movieAction.reverseToprated(topRatedMovies));
  //     setObjectMovies(topRatedMovies);
  //   }
  //   if (descendingRequest != isTopratedDescending) {
  //     topRatedMovies.results.reverse();
  //     console.log("topRatedMovies:", topRatedMovies);
  //     dispatch(movieAction.reverseToprated(topRatedMovies));
  //     setPopularDescending(!isTopratedDescending);
  //   } else {
  //     return;
  //   }
  // };

  return (
    <div className="movieDetailBg">
      <Container>
        <Row>
          <Col xs={3}>
            <Row>
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  Sort Results By
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => sortPopularMoviesByDesc(true)}
                  >
                    Popularity(Descending)
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => sortPopularMoviesByDesc(false)}
                  >
                    Popularity(Ascending)
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Release date(Descending)
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Release date(Ascending)
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => sortTopRatedMoviesByDesc(true)}
                  >
                    Top Rated(Descending)
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => sortTopRatedMoviesByDesc(false)}
                  >
                    Top Rated(Ascending)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <Row>FilterBox</Row>
          </Col>
          <Col xs={9} className="movieDetailSubBg">
            <BigMovieCards data={objectMovies}></BigMovieCards>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movies;
