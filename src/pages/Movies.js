import React, { useEffect, useState } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import BigMovieCards from "./../components/BigMovieCards";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "./../redux/actions/MovieAction";
import MultiRangeSlider from "multi-range-slider-react";

const Movies = () => {
  const { popularMovies, topRatedMovies, upcomingMovies } = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();
  const [isPopularDescending, setPopularDescending] = useState(true);
  const [isTopratedDescending, setTopratedDescending] = useState(true);
  const [isUpcomingDescending, setUpcomingDescending] = useState(true);
  const [objectMovies, setObjectMovies] = useState("");
  const [sortBy, setSortBy] = useState("Sort by:");
  const [minValue, setMinValue] = useState("1960");
  const [maxValue, setMaxValue] = useState("2023");
  const [flag, setFlag] = useState(false);

  /* pagination start */
  // const [pageCount, setPageCount] = useState(1);
  // const [itemOffset, setItemOffset] = useState(0);

  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // const itemsPerPage = 3;
  // const endOffset = itemOffset + itemsPerPage;

  // const currentItems = items.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  /* pagination end */

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  useEffect(() => {
    setObjectMovies(popularMovies);
    // setPageCount(5);
  }, [popularMovies]);

  useEffect(() => {
    console.log("flag:", flag);
  }, [flag]);

  const sortPopularMoviesByDesc = (descendingRequest) => {
    if (descendingRequest && isPopularDescending) {
      setSortBy("Popularity (Descending)");
    } else if (descendingRequest && !isPopularDescending) {
      popularMovies.results.reverse();
      setPopularDescending(!isPopularDescending);
      setSortBy("Popularity (Descending)");
    } else if (!descendingRequest && !isPopularDescending) {
      setSortBy("Popularity (Ascending)");
    } else {
      popularMovies.results.reverse();
      setPopularDescending(!isPopularDescending);
      setSortBy("Popularity (Ascending)");
    }
    dispatch(movieAction.reversePopular(popularMovies));
    setObjectMovies(popularMovies);
    setFlag(!flag);
  };

  const sortTopRatedMoviesByDesc = (descendingRequest) => {
    if (descendingRequest && isTopratedDescending) {
      setSortBy("Top Rated (Descending)");
    } else if (descendingRequest && !isTopratedDescending) {
      topRatedMovies.results.reverse();
      setTopratedDescending(!isTopratedDescending);
      setSortBy("Top Rated (Descending)");
    } else if (!descendingRequest && !isTopratedDescending) {
      setSortBy("Top Rated (Ascending)");
    } else {
      topRatedMovies.results.reverse();
      setTopratedDescending(!isTopratedDescending);
      setSortBy("Top Rated (Ascending)");
    }
    dispatch(movieAction.reverseToprated(topRatedMovies));
    setObjectMovies(topRatedMovies);
    setFlag(!flag);
  };

  const sortUpcomingMoviesByDesc = (descendingRequest) => {
    if (descendingRequest && isUpcomingDescending) {
      setSortBy("Upcoming (Descending)");
    } else if (descendingRequest && !isUpcomingDescending) {
      upcomingMovies.results.reverse();
      setUpcomingDescending(!isUpcomingDescending);
      setSortBy("Upcoming (Descending)");
    } else if (!descendingRequest && !isUpcomingDescending) {
      setSortBy("Upcoming (Ascending)");
    } else {
      upcomingMovies.results.reverse();
      setUpcomingDescending(!isUpcomingDescending);
      setSortBy("Upcoming (Ascending)");
    }
    dispatch(movieAction.reverseUpcoming(upcomingMovies));
    setObjectMovies(upcomingMovies);
    setFlag(!flag);
  };

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

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
                min={1960}
                max={2023}
                step={1}
                ruler={false}
                label={false}
                barInnerColor="red"
                thumbLeftColor="red"
                thumbRightColor="red"
                minValue={minValue}
                maxValue={maxValue}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </Row>
          </Col>
          <Col xs={9} className="movieDetailSubBg">
            <Row>
              <BigMovieCards
                data={objectMovies}
                minValue={minValue}
                maxValue={maxValue}
                refresh={flag}
                sortBy={sortBy}
              ></BigMovieCards>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movies;
