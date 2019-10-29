import React, { useState } from "react";
// import ReviewFormAutocomplete from "./ReviewFormAutocomplete";
import { useSelector } from "react-redux";
import StarRate from "@material-ui/icons/StarRate";
import Divider from "@material-ui/core/Divider";
import { dispatch } from "../store";
import { Button, TextField } from "@material-ui/core";
import { starQuestions } from "../utils";

function makeStars(setQuestions, questionNumber, questions) {
  const stars = [];
  const question = questions[questionNumber];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <StarRate
        onMouseEnter={() => {
          if (question.hasStaticStars) return 0;
          question.coloredStars = i + 1;
          setQuestions(questions);
        }}
        onMouseLeave={() => {
          if (question.hasStaticStars) return 0;
          question.coloredStars = 0;
          setQuestions(questions);
        }}
        onClick={() => {
          if (question.hasStaticStars) {
            question.coloredStars = i + 1;
          }
          question.hasStaticStars = true;
          setQuestions(questions);
        }}
        style={{ color: i < question.coloredStars ? "green" : "yellow" }}
        key={i}
      />
    );
  }
  return stars;
}

function EditReview({ match, history }) {
  const review = useSelector(state => {
    return state.user.reviews.find(review => {
      return review.id == match.params.reviewId;
    });
  });
  console.log("review", review);
  const { name, questions, comment, id, vendorId } = review;
  const [formQuestions, setQuestions] = useState(
    starQuestions.map((question, index) => ({
      text: question,
      coloredStars: questions[index],
      hasStaticStars: true
    }))
  );
  const [formComment, setComment] = useState(comment);

  return (
    <div>
      <div style={{ fontSize: "20px" }}>{name}</div>

      <div>
        <Divider />
        <div style={{ marginLeft: "10px" }}>
          {formQuestions.map((question, questionNumber) => {
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
                  {makeStars(setQuestions, questionNumber, [...formQuestions])}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: "10px", marginTop: "20px", maxWidth: "85%" }}>
          <div>Additional Comments:</div>
          <TextField
            id="outlined-multiline-flexible"
            fullWidth={true}
            multiline
            rowsMax="4"
            value={formComment}
            onChange={e => setComment(e.target.value)}
            className={null}
            margin="normal"
            variant="outlined"
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: "25px", marginLeft: "15px" }}
          onClick={() => {
            console.log("questions", {
              questions: formQuestions,
              comment: formComment,
              id
            });
            dispatch.reviews.updateReview({
              questions: formQuestions,
              comment: formComment,
              id,
              vendorId
            });
            history.push("/your-reviews");
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default EditReview;
