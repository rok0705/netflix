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
  updatedMovies: {},
  popularPerPage: {},
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
      // console.log("payload:", payload);
      return {
        ...state,
        selectedMovie: payload.selectedMovie,
        genreList: payload.genreList,
        movieReviews: payload.movieReviews,
        relatedMovies: payload.relatedMovies,
        trailerId: payload.trailerId,
      };
    case "REVERSE_POPULAR":
      // console.log("At reducer popularMovies:", payload.popularMovies);
      return { ...state, popularMovies: payload.popularMovies };
    case "REVERSE_TOPRATED":
      // console.log("At reducer toprated:", payload.topRatedMovies);
      return { ...state, topRatedMovies: payload.topRatedMovies };
    case "REVERSE_UPCOMING":
      return { ...state, upcomingMovies: payload.upcomingMovies };
    case "UPDATE_MOVIES":
      // console.log("At reducer, updatedMovies:", payload);
      return { ...state, updatedMovies: payload.updatedMovies };
    case "BY_PAGE_REQUEST":
      console.log("At reducer, updatedmoviebypage:", payload.updatedMovies);
      return { ...state, updatedMovies: payload.updatedMovies };
    case "KEYWORD_QUERY":
      return { ...state, updatedMovies: payload.updatedMovies };
    default:
      return { ...state };
  }
}

export default movieReducer;
