import React from "react";
import StarRate from "@material-ui/icons/StarRate";

export default function makeStars(starsCount) {
  const stars = [];
  const partialStar = starsCount % 1;
  for (let i = 0; i < Math.floor(starsCount); i++) {
    stars.push(<StarRate style={{ color: "green" }} key={i} />);
  }
  partialStar &&
    stars.push(<StarRate style={{ color: "lightgreen" }} key={starsCount} />);

  return stars;
}
