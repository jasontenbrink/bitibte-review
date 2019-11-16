import React from "react";
import StarRate from "@material-ui/icons/StarRate";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { starQuestions } from "../utils";

function makeStars(starsCount) {
  const stars = [];
  const partialStar = starsCount % 1;
  for (let i = 0; i < Math.floor(starsCount); i++) {
    stars.push(<StarRate style={{ color: "green" }} key={i} />);
  }
  partialStar &&
    stars.push(<StarRate style={{ color: "lightgreen" }} key={starsCount} />);
  return stars;
}
function Review({ review, history, ...rest }) {
  return review ? (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ fontSize: "24pt" }}>{review && review.name}</div>
        <Button
          color="primary"
          onClick={() => {
            history.push(`/review-form/${review.vendorId}/${review.name}`);
          }}
        >
          Review this Vendor
        </Button>
      </div>
      <Divider />
      <div style={{ marginLeft: "10px" }}>
        {review &&
          starQuestions.map((question, index) => {
            return (
              <div style={{ marginTop: "20px" }} key={question}>
                <span style={{ maxWidth: "70%", display: "inline-block" }}>
                  {question}
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "7px",
                    marginLeft: "15px"
                  }}
                >
                  {makeStars(review.questions[index])}
                </span>
              </div>
            );
          })}
        {/* {review &&
          booleanQuestions.map((question, index) => {
            return (
              <div style={{ marginTop: "20px" }} key={question.text}>
                <span style={{ maxWidth: "70%", display: "inline-block" }}>
                  {question}
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "0px",
                    marginLeft: "15px",
                    fontWeight: "bold",
                    fontSize: "14pt"
                  }}
                >
                  {review.questions[index]}
                </span>
              </div>
            );
          })} */}
        {/* {review &&
          numberQuestions.map((question, index) => {
            return (
              <div style={{ marginTop: "20px" }} key={question.text}>
                <span style={{ maxWidth: "70%", display: "inline-block" }}>
                  {question}
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "0px",
                    marginLeft: "15px",
                    fontWeight: "bold",
                    fontSize: "14pt"
                  }}
                >
                  {review.questions[index]}
                </span>
              </div>
            );
          })} */}
        <div>
          <Divider style={{ marginTop: "20px" }} />
          {review.comments
            .filter(comment => comment)
            .map((comment, index) => (
              <div style={{ marginTop: "30px" }} key={index}>
                {/* <Typography component="h4">{comment.authorName}</Typography> */}
                <p style={{ marginLeft: "10px" }}>"{comment}"</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : null;
}

const mapStateToProps = state => ({
  review: state.reviews.find(review => {
    return review.vendorId === state.selectedReview;
  })
});

export default connect(mapStateToProps)(Review);
