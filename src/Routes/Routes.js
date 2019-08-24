import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import ReviewForm from "../ReviewForm";
import Review from "../Review";
import Login from "../Login";

const Routes = ({ reviews, questions }) => {
  return (
    <React.Fragment>
      <Route path="/" exact component={Review} />
      <Route path="/login" component={Login} />
      <Route
        path="/review-form/:vendorUuid/:vendorName"
        render={props => {
          const { vendorUuid, vendorName } = props.match.params;
          return questions.length > 0 ? (
            <ReviewForm
              vendorUuid={vendorUuid}
              vendorName={vendorName}
              history={props.history}
            />
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
