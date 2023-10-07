import React, { useEffect, useState, CSSProperties } from "react";
import { movieAction } from "../redux/actions/MovieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  if (loading) {
    return (
      <ClipLoader
        color="#FFA500"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      ></ClipLoader>
    );
  } else {
    return (
      <div>
        <Banner movie={popularMovies.results[0]} />
        <h1>Popular Movies</h1>
        <MovieSlide movies={popularMovies}></MovieSlide>
        <h1>Top Rated Movies</h1>
        <MovieSlide movies={topRatedMovies}></MovieSlide>
        <h1>Upcoming Movies</h1>
        <MovieSlide movies={upcomingMovies}></MovieSlide>
      </div>
    );
  }
};

export default Home;
