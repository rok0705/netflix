import React, { useEffect, useState } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import BigMovieCards from "./../components/BigMovieCards";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "./../redux/actions/MovieAction";
import MultiRangeSlider from "multi-range-slider-react";

const Movies = () => {
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [isPopularDescending, setPopularDescending] = useState(true);
  const [isTopratedDescending, setTopratedDescending] = useState(true);
  const [isUpcomingDescending, setUpcomingDescending] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [objectMovies, setObjectMovies] = useState("");
  const [backupMovies, setBackupMovies] = useState("");
  const [sortBy, setSortBy] = useState("Sort by:");
  const [minValue, setMinValue] = useState("1980");
  const [maxValue, setMaxValue] = useState("2023");

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  useEffect(() => {
    setObjectMovies(popularMovies);
  }, [popularMovies]);

  useEffect(() => {
    if (!backupMovies) {
      let backup = Object.assign({}, objectMovies);
      setBackupMovies(backup);
      console.log("backing up initial:", backup);
    } else {
      // restore objectMovies
      console.log("restored objectMovies:", objectMovies);
    }
  }, [objectMovies]);

  useEffect(() => {
    console.log("33backupMovies:", backupMovies);
  }, [backupMovies]);

  const sortPopularMoviesByDesc = (descendingRequest) => {
    if (descendingRequest && isPopularDescending) {
      dispatch(movieAction.reversePopular(popularMovies));
      setObjectMovies(popularMovies);
      setSortBy("Popularity (Descending)");
    } else if (descendingRequest && !isPopularDescending) {
      popularMovies.results.reverse();
      dispatch(movieAction.reversePopular(popularMovies));
      setObjectMovies(popularMovies);
      setPopularDescending(!isPopularDescending);
      setSortBy("Popularity (Descending)");
    } else if (!descendingRequest && !isPopularDescending) {
      dispatch(movieAction.reversePopular(popularMovies));
      setObjectMovies(popularMovies);
      setSortBy("Popularity (Ascending)");
    } else {
      popularMovies.results.reverse();
      dispatch(movieAction.reversePopular(popularMovies));
      setPopularDescending(!isPopularDescending);
      setObjectMovies(popularMovies);
      setSortBy("Popularity (Ascending)");
    }
  };

  const sortTopRatedMoviesByDesc = (descendingRequest) => {
    if (descendingRequest && isTopratedDescending) {
      dispatch(movieAction.reverseToprated(topRatedMovies));
      setObjectMovies(topRatedMovies);
      setSortBy("Top Rated (Descending)");
    } else if (descendingRequest && !isTopratedDescending) {
      topRatedMovies.results.reverse();
      dispatch(movieAction.reverseToprated(topRatedMovies));
      setObjectMovies(topRatedMovies);
      setTopratedDescending(!isTopratedDescending);
      setSortBy("Top Rated (Descending)");
    } else if (!descendingRequest && !isTopratedDescending) {
      dispatch(movieAction.reverseToprated(topRatedMovies));
      setObjectMovies(topRatedMovies);
      setSortBy("Top Rated (Ascending)");
    } else {
      topRatedMovies.results.reverse();
      dispatch(movieAction.reverseToprated(topRatedMovies));
      setTopratedDescending(!isTopratedDescending);
      setObjectMovies(topRatedMovies);
      setSortBy("Top Rated (Ascending)");
    }
  };

  const sortUpcomingMoviesByDesc = (descendingRequest) => {
    if (descendingRequest && isUpcomingDescending) {
      dispatch(movieAction.reverseUpcoming(upcomingMovies));
      setObjectMovies(upcomingMovies);
      setSortBy("Upcoming (Descending)");
    } else if (descendingRequest && !isUpcomingDescending) {
      upcomingMovies.results.reverse();
      dispatch(movieAction.reverseUpcoming(upcomingMovies));
      setObjectMovies(upcomingMovies);
      setUpcomingDescending(!isUpcomingDescending);
      setSortBy("Upcoming (Descending)");
    } else if (!descendingRequest && !isUpcomingDescending) {
      dispatch(movieAction.reverseUpcoming(upcomingMovies));
      setObjectMovies(upcomingMovies);
      setSortBy("Upcoming (Ascending)");
    } else {
      upcomingMovies.results.reverse();
      dispatch(movieAction.reverseUpcoming(upcomingMovies));
      setUpcomingDescending(!isUpcomingDescending);
      setObjectMovies(upcomingMovies);
      setSortBy("Upcoming (Ascending)");
    }
  };

  function filterByYear(movie) {
    let year = movie.release_date.split("-")[0];
    if (year <= maxValue && year >= minValue) {
      return movie;
    }
  }

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  useEffect(() => {
    if (!objectMovies.results) return;
    if (!backupMovies) return;
    // restore objectMovies
    console.log("useEffect()-backupMovies:", backupMovies);
    setObjectMovies(backupMovies);

    console.log("backupMovies, ObjectMovies:", backupMovies, objectMovies);
    var filteredMovies = null;
    filteredMovies = objectMovies.results.filter(filterByYear);
    // console.log("filteredMovies:", filteredMovies);
    objectMovies.results = filteredMovies;
    console.log("objectMovies:", objectMovies);
    setObjectMovies(objectMovies);
  }, [minValue, maxValue]);

  return (
    <div className="movieDetailBg">
      <Container>
        <Row>
          <Col xs={3}>
            <Row className="SortByRow">
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  {sortBy}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => sortPopularMoviesByDesc(true)}
                  >
                    Popularity (Descending)
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => sortPopularMoviesByDesc(false)}
                  >
                    Popularity (Ascending)
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => sortUpcomingMoviesByDesc(true)}
                  >
                    Upcoming (Descending)
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => sortUpcomingMoviesByDesc(false)}
                  >
                    Upcoming (Ascending)
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => sortTopRatedMoviesByDesc(true)}
                  >
                    Top Rated (Descending)
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => sortTopRatedMoviesByDesc(false)}
                  >
                    Top Rated (Ascending)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <Row className="filter-container">
              <Row className="sortType">
                <div>YEAR Filter</div>
              </Row>
              <Row className="filterType">
                <div>
                  From:{minValue} - To:{maxValue}
                </div>
              </Row>
              <MultiRangeSlider
                min={1980}
                max={2023}
                step={1}
                ruler={false}
                label={false}
                barInnerColor="red"
                thumbLeftColor="red"
                thumbRightColor="red"
                minValue={minValue}
                maxValue={maxValue}
                onInput={(e) => {
                  handleInput(e);
                }}
              />
            </Row>
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
