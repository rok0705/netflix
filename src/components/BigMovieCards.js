import React, { useEffect, useState } from "react";
import BigMovieCard from "./BigMovieCard";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "./../redux/actions/MovieAction";
import ReactPaginate from "react-paginate";

const BigMovieCards = ({ data, minValue, maxValue, refresh, sortBy }) => {
  const dispatch = useDispatch();
  const { updatedMovies, fromSearch, keyword } = useSelector(
    (state) => state.movie
  );

  let originalMovies = Object.assign({}, "");
  const [initial, setInitial] = useState(true);
  const [ready, setReady] = useState(false);

  function filterByYear(movie) {
    let year = movie.release_date.split("-")[0];
    if (year <= maxValue && year >= minValue) {
      return movie;
    }
  }

  useEffect(() => {
    setInitial(false);
  }, []);

  useEffect(() => {
    console.log("refresh:", refresh);
    if (refresh) {
      setReady(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (!data) return;
    if (data.results === undefined) return;
    originalMovies = Object.assign({}, data);

    console.log("data:", data);
  }, [data && !initial]);

  useEffect(() => {}, [originalMovies]);

  useEffect(() => {
    if (!data) return;
    if (data.results === undefined) return;

    var filteredMovies = data.results.filter(filterByYear);
    //data.results = filteredMovies;
    originalMovies.results = filteredMovies;
    setReady(true);
    console.log("data vs. originalMoviess:", data, originalMovies);
    dispatch(movieAction.updatedMovies(originalMovies));
  }, [minValue, maxValue]);

  useEffect(() => {
    console.log("updatedList:", updatedMovies);
  }, [updatedMovies]);

  /* pagination */
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 2; // Number of items to display per page

  const handlePageChange = ({ selected }) => {
    if (selected < 0) return;
    setPageNumber(selected + 1);
    console.log("selected:", selected);
  };

  useEffect(() => {
    setReady(true);
    console.log("keyword:", keyword);
    if (fromSearch) {
      dispatch(movieAction.byPage("fromSearch", pageNumber, keyword));
    } else {
      dispatch(movieAction.byPage(sortBy, pageNumber, keyword));
    }
    console.log("ready:", ready);
  }, [pageNumber]);

  if (ready) {
    return (
      <div>
        <Container>
          <Row xs={2} className="movieCols">
            {updatedMovies?.results &&
              updatedMovies?.results?.map((movie, index) => (
                <Col>
                  <BigMovieCard key={index} movie={movie}></BigMovieCard>
                </Col>
              ))}
          </Row>
          <Row>
            <ReactPaginate
              className="PageBox"
              pageClassName="li-item"
              pageCount={10}
              pageRangeDisplayed={3}
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <Row xs={2} className="movieCols">
            {data.results &&
              data?.results?.map((movie, index) => (
                <Col>
                  <BigMovieCard key={index} movie={movie}></BigMovieCard>
                </Col>
              ))}
          </Row>
          <Row>
            <ReactPaginate
              className="PageBox"
              pageClassName="li-item"
              pageCount={10}
              pageRangeDisplayed={3}
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </Row>
        </Container>
      </div>
    );
  }
};

export default BigMovieCards;
