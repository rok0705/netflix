import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    // 1. fetch

    // 2. axios
    const popularMovieApi = api.get(
      `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    const topratedMovieApi = api.get(
      `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );

    const upcomingMovieApi = api.get(
      `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );

    let [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
      popularMovieApi,
      topratedMovieApi,
      upcomingMovieApi,
    ]);

    dispatch({
      type: "GET_MOVIES_SUCCESS",
      payload: {
        popularMovies: popularMovies.data,
        topRatedMovies: topRatedMovies.data,
        upcomingMovies: upcomingMovies.data,
      },
    });
  };
}

export const movieAction = { getMovies };
