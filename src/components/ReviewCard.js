import React from "react";

const ReviewCard = ({ data }) => {
  return (
    <div>
      <div>
        <div className="card-bg">
          <div className="card-title">{data?.author}</div>
          <div className="card-text">{data?.content}</div>
        </div>
        <hr className="detailpage-line-review"></hr>
      </div>
    </div>
  );
};

export default ReviewCard;
