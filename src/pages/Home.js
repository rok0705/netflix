import React, { useEffect } from "react";
import { movieAction } from "../redux/actions/MovieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies } = useSelector(
    (state) => state.movie
  );

  console.log("home:", popularMovies);
  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  return (
    <div>
      {popularMovies.results && <Banner movie={popularMovies.results[0]} />}
      <h1>Popular Movies</h1>
      <MovieSlide movies={popularMovies}></MovieSlide>
      <h1>Top Rated Movies</h1>
      <MovieSlide movies={topRatedMovies}></MovieSlide>
      <h1>Upcoming Movies</h1>
      <MovieSlide movies={upcomingMovies}></MovieSlide>
    </div>
  );
};

export default Home;
