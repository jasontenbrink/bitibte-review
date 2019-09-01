import React from "react";
import StarRate from "@material-ui/icons/StarRate";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

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
            history.push(`/review-form/${review.vendorUuid}/${review.name}`);
          }}
        >
          Review this Vendor
        </Button>
      </div>
      <Divider />
      <div style={{ marginLeft: "10px" }}>
        {review &&
          review.questions.map(question => {
            return (
              <div style={{ marginTop: "20px" }} key={question.text}>
                <span style={{ maxWidth: "70%", display: "inline-block" }}>
                  {question.text}
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "5px",
                    marginLeft: "15px"
                  }}
                >
                  {makeStars(question.stars)}
                </span>
              </div>
            );
          })}
        <div>
          <Divider style={{ marginTop: "20px" }} />
          {review.comments.map(comment => (
            <div style={{ marginTop: "30px" }} key={comment.text}>
              {/* <Typography component="h4">{comment.authorName}</Typography> */}
              <p style={{ marginLeft: "10px" }}>"{comment.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}

const mapStateToProps = state => ({
  review: state.reviews.find(review => {
    return review.uuid === state.selectedReview;
  })
});

export default connect(mapStateToProps)(Review);
