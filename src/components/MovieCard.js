import React from "react";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { genreList } = useSelector((state) => state.movie);
  const navigate = useNavigate();

  function searchGenreName(item) {
    for (var i = 0; i < genreList.length; i++) {
      if (genreList[i].id == item) {
        return genreList[i].name;
      }
    }

    return "GenreError";
  }

  const goToDetailPage = () => {
    console.log("movie.id:", item.id);
    navigate(`/movies/${item.id}`);
  };

  return (
    <div
      className="card"
      style={{
        backgroundImage:
          "url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces" +
          `${item.poster_path}` +
          ")",
      }}
    >
      <div className="overlay" onClick={goToDetailPage}>
        <h1 className="movieTitle">{item.title}</h1>
        <div>
          {item.genre_ids.map((item, index) => (
            <Badge bg="danger" key={index}>
              {/* {searchGenreName(item)} */}
              {genreList.find((genre) => genre.id == item).name}
            </Badge>
          ))}
        </div>
        <div>
          <span>Rating: {item.vote_average}</span>
        </div>
        <div>
          <span>{item.adult ? "18+" : "All Age"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
