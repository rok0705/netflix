import React from "react";
import Badge from "react-bootstrap/Badge";

const MovieCard = ({ item }) => {
  console.log("post_path:", item);
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
      <div className="overlay">
        <h1>{item.title}</h1>
        <div>
          {item.genre_ids.map((item) => (
            <Badge bg="danger">{item}</Badge>
          ))}
        </div>
        <div>
          <span>{item.vote_average}</span>
          <span>{item.adult ? "18+" : "All Age"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
