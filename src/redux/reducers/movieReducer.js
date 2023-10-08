let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  loading: true,
  genreList: [],
  selectedMovie: null,
};

function movieReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_MOVIES_SUCCESS":
      // console.log("genrelist:", payload.genreList);
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
      return { ...state, selectedMovie: payload };
    default:
      return { ...state };
  }
}

export default movieReducer;
