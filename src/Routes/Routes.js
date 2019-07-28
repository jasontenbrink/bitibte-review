import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import ReviewForm from "../ReviewForm";
import Review from "../Review";

const Routes = ({ reviews, questions }) => {
  return (
    <React.Fragment>
      <Route path="/" exact component={Review} />
      <Route path="/poo" component={() => <h1>hi mom</h1>} />
      <Route
        path="/review-form/:vendorUuid/:vendorName"
        render={props => {
          const { vendorUuid, vendorName } = props.match.params;
          return questions.length > 0 ? (
            <ReviewForm vendorUuid={vendorUuid} vendorName={vendorName} />
          ) : null;
        }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  reviews: state.reviews,
  questions: state.questions
});

export default connect(mapStateToProps)(Routes);
