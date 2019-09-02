import React, { useState } from "react";
// import ReviewFormAutocomplete from "./ReviewFormAutocomplete";
import { connect } from "react-redux";
import StarRate from "@material-ui/icons/StarRate";
import Divider from "@material-ui/core/Divider";
import { dispatch } from "../store";
import { Button, TextField } from "@material-ui/core";

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

function ReviewForm(props) {
  //get vendorUUid from route params
  const [questions, setQuestions] = useState(
    props.questions.map(question => ({
      text: question.text,
      coloredStars: 0,
      hasStaticStars: false,
      uuid: question.uuid
    }))
  );
  const [comment, setComment] = useState("");

  return (
    <div>
      <div style={{ fontSize: "20px" }}>{props.vendorName}</div>

      <div>
        <Divider />
        <div style={{ marginLeft: "10px" }}>
          {questions.map((question, questionNumber) => {
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
                  {makeStars(setQuestions, questionNumber, [...questions])}
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
            value={comment}
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
              questions,
              comment,
              vendorUuid: props.vendorUuid
            });
            dispatch.reviews.postReview({
              questions,
              comment,
              vendorUuid: props.vendorUuid
            });
            props.history.push("/reviews");
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  questions: state.questions
});
export default connect(mapStateToProps)(ReviewForm);
