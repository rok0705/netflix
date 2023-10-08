import React from "react";
import Card from "react-bootstrap/Card";

const ReviewCard = ({ data }) => {
  console.log("reviewcard:", data);
  return (
    <div>
      <div className="card-bg">
        <div className="card-title">{data?.author}</div>
        <div className="card-text">{data?.content}</div>
      </div>
      <hr className="detailpage-line-review"></hr>
    </div>
  );
};

export default ReviewCard;
