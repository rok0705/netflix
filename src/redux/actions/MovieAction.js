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

      // console.log("At middleware, getMovies");

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

    const relatedMovieApi = api.get(
      `/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );

    const trailerApi = api.get(
      `/movie/${id}/videos?api_key=${API_KEY}&language=en-US&page=1`
    );

    let [movieDetail, genreList, movieReviews, relatedMovies, trailerId] =
      await Promise.all([
        movieDetailApi,
        genreListApi,
        movieReviewApi,
        relatedMovieApi,
        trailerApi,
      ]);

    // console.log("trailerId:", trailerId);

    dispatch({
      type: "GET_MOVIE_DETAIL_SUCCESS",
      payload: {
        selectedMovie: movieDetail.data,
        genreList: genreList.data.genres,
        movieReviews: movieReviews.data.results,
        relatedMovies: relatedMovies.data.results,
        trailerId: trailerId.data.results[0].key,
      },
    });

    // console.log("getMovieDetail middleware:", movieDetail);
  };
}

function reversePopular(popularMovies) {
  return (dispatch) => {
    // console.log("At middleware:", popularMovies);
    dispatch({
      type: "REVERSE_POPULAR",
      payload: {
        popularMovies: popularMovies,
      },
    });
  };
}

function reverseToprated(topRatedMovies) {
  return (dispatch) => {
    // console.log("At middleware:", topRatedMovies);
    dispatch({
      type: "REVERSE_TOPRATED",
      payload: {
        topRatedMovies: topRatedMovies,
      },
    });
  };
}

function reverseUpcoming(upcomingMovies) {
  return (dispatch) => {
    dispatch({
      type: "REVERSE_UPCOMING",
      payload: {
        upcomingMovies: upcomingMovies,
      },
    });
  };
}

function updatedMovies(originalMovies) {
  return (dispatch) => {
    // console.log("middleware, updatedMovies:", originalMovies);
    dispatch({
      type: "UPDATE_MOVIES",
      payload: {
        updatedMovies: originalMovies,
      },
    });
  };
}

export const movieAction = {
  getMovies,
  getMovieDetail,
  reversePopular,
  reverseToprated,
  reverseUpcoming,
  updatedMovies,
};
