import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewCards = ({ data }) => {
  // console.log("reviewcards:", data);

  return (
    <div className="review-boxBorder">
      {data.map((review, index) => (
        <ReviewCard data={review} key={index}></ReviewCard>
      ))}
    </div>
  );
};

export default ReviewCards;
