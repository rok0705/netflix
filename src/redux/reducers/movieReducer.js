let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  loading: true,
  genreList: [],
  selectedMovie: null,
  movieReviews: [],
  relatedMovies: [],
  trailerId: "",
};

function movieReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        popularMovies: payload.popularMovies,
        topRatedMovies: payload.topRatedMovies,
        upcomingMovies: payload.upcomingMovies,
        loading: false,
        genreList: payload.genreList,
      };
    case "GET_MOVIES_REQUEST":
      return { ...state, loading: true };
    case "GET_MOVIES_FAILURE":
      return { ...state, loading: false };
    case "GET_MOVIE_DETAIL_SUCCESS":
      console.log("payload:", payload);
      return {
        ...state,
        selectedMovie: payload.selectedMovie,
        genreList: payload.genreList,
        movieReviews: payload.movieReviews,
        relatedMovies: payload.relatedMovies,
        trailerId: payload.trailerId,
      };
    default:
      return { ...state };
  }
}

export default movieReducer;
