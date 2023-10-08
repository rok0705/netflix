import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    // 2. axios
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });

      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const topratedMovieApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );

      const upcomingMovieApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const genreListApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`
      );

      let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topratedMovieApi,
          upcomingMovieApi,
          genreListApi,
        ]);

      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          loading: false,
          genreList: genreList.data.genres,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}

function getMovieDetail(id) {
  return async (dispatch) => {
    const movieDetailApi = api.get(
      `/movie/${id}?api_key=${API_KEY}&language=en-US&page=1`
    );

    const genreListApi = api.get(
      `/genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`
    );

    const movieReviewApi = api.get(
      `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    );

    let [movieDetail, genreList, movieReviews] = await Promise.all([
      movieDetailApi,
      genreListApi,
      movieReviewApi,
    ]);

    dispatch({
      type: "GET_MOVIE_DETAIL_SUCCESS",
      payload: {
        selectedMovie: movieDetail.data,
        genreList: genreList.data.genres,
        movieReviews: movieReviews.data.results,
      },
    });

    // console.log("getMovieDetail middleware:", movieDetail);
  };
}

export const movieAction = { getMovies, getMovieDetail };
