import React from "react";

const Banner = ({ movie }) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          "url(" +
          `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.poster_path}` +
          ")",
      }}
    >
      <div className="banner-info">
        <h1 className="banner-title">{movie.title}</h1>
        <p className="banner-description">{movie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
