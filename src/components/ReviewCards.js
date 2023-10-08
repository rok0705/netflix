import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewCards = ({ data }) => {
  console.log("reviewcards:", data);

  return (
    <div className="review-boxBorder">
      {data.map((review) => (
        <ReviewCard data={review}></ReviewCard>
      ))}
    </div>
  );
};

export default ReviewCards;
