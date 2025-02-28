import React from "react";
import "../styles/temp.css"

const Card = ({ price, name, rating, image }) => {
  const average = rating?.average ? parseFloat(rating.average).toFixed(1) : "N/A";
  const reviews = rating?.reviews || 0;

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i + 1 <= roundedRating ? "full" : i + 0.5 === roundedRating ? "half" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Price: ${price}</p>
      <div className="stars">{average !== "N/A" ? renderStars(average) : "No rating"}</div>
      <p>Rating: {average} ({reviews} reviews)</p>
    </div>
  );
};

export default Card;
