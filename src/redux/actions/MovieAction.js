import api from "../api";

function getMovies() {
  return async (dispatch) => {
    // 1. fetch
    // let url_popular = `https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1`;
    // let response_popular = await fetch(url_popular);
    // let data_popular = await response_popular.json();
    // let url_toprated = `https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1`;
    // let response_toprated = await fetch(url_toprated);
    // let data_toprated = await response_toprated.json();
    // let url_upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1`;
    // let response_upcoming = await fetch(url_upcoming);
    // let data_upcoming = await response_upcoming.json();

    // 2. axios
    const popularMovieApi = await api.get(
      `/movie/popular?api_key=<<api_key>>&language=en-US&page=1`
    );
  };
}

export const movieAction = { getMovies };
