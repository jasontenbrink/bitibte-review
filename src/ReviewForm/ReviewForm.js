import React, { useState } from "react";
// import ReviewFormAutocomplete from "./ReviewFormAutocomplete";
import StarRate from "@material-ui/icons/StarRate";
import Divider from "@material-ui/core/Divider";
import { dispatch } from "../store";
import { Button, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { starQuestions, numberQuestions, booleanQuestions } from "../utils";
const approve = require("approvejs");

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
  const [formQuestions, setQuestions] = useState(
    starQuestions.map(question => ({
      text: question,
      coloredStars: 0,
      hasStaticStars: false
    }))
  );
  const [comment, setComment] = useState("");
  const [formNumberQuestions, setNumberQuestions] = useState(
    numberQuestions.map(question => ({ text: question, value: "" }))
  );
  const [formBooleanQuestions, setFormBooleanQuestions] = useState(
    booleanQuestions.map(question => ({ text: question, value: "" }))
  );
  return (
    <div>
      <div style={{ fontSize: "20px" }}>{props.vendorName}</div>

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
        {/* {formBooleanQuestions.map(question => {
          return (
            <div key={question.text} style={{ marginLeft: "10px" }}>
              <FormControl
                component="div"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px"
                }}
              >
                <div>{question.text}</div>
                <RadioGroup
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                    top: "-10px",
                    marginLeft: "15px"
                  }}
                  aria-label="gender"
                  name="gender1"
                  value={question.value}
                  onChange={e => {
                    question.value = e.target.value;
                    setFormBooleanQuestions([...formBooleanQuestions]);
                  }}
                >
                  <FormControlLabel
                    value={"true"}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={"false"}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          );
        })} */}
        {/* <div style={{ marginLeft: "10px" }}> */}
        {/* {formNumberQuestions.map((question, questionNumber) => {
            return (
              <div style={{ marginTop: "20px" }} key={question.text}>
                <span style={{ maxWidth: "70%", display: "inline-block" }}>
                  {question.text}
                </span>

                <TextField
                  style={{
                    verticalAlign: "top",
                    width: "75px",
                    marginLeft: "10px",
                    marginBottom: "0px",
                    marginTop: "0px",
                    padding: "0px"
                  }}
                  InputProps={{ style: { height: "37px" } }}
                  id="outlined-multiline-flexible"
                  fullWidth={false}
                  multiline
                  rowsMax="4"
                  value={question.value}
                  onChange={e => {
                    const value = parseInt(e.target.value);
                    const validatedValue = approve.value(value, {
                      numeric: true,
                      range: { min: 0, max: 100 }
                    });
                    if (validatedValue.approved) {
                      question.value = value;
                      setNumberQuestions([...formNumberQuestions]);
                    }
                    if (e.target.value === "") {
                      question.value = e.target.value;
                      setNumberQuestions([...formNumberQuestions]);
                    }
                  }}
                  className={null}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            );
          })} */}
        {/* </div> */}
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
              formQuestions,
              comment,
              vendorId: props.vendorId
            });
            dispatch.reviews.postReview({
              questions: formQuestions,
              comment,
              vendorId: props.vendorId
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

// const mapStateToProps = state => ({
//   questions: state.questions
// });
export default /*connect(mapStateToProps)*/ ReviewForm;
