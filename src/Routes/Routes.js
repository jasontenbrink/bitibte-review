import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import ReviewForm from "../ReviewForm";
import Review from "../Review";
import Login from "../Login";
import Registration from "../Registration";
import ForgotPassword from "../ForgotPassword";
import SuggestVendor from "../SuggestVendor";
import UserReviews from "../UserReviews";
import EditReview from "../EditReview";

const Routes = () => {
  const questions = useSelector(state => state.questions);
  const user = useSelector(state => state.user);

  return (
    <Switch>
      <Route path="/" exact component={Review} />
      <Route path="/login" component={Login} />
      <Route path="/suggest-vendor" component={SuggestVendor} />
      <Route path="/your-reviews" component={UserReviews} />
      <Route path="/registration" component={Registration} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/edit-review/:reviewUuid" component={EditReview} />
      <Route
        path="/review-form/:vendorUuid/:vendorName"
        render={props => {
          if (user.loggedIn) {
            const { vendorUuid, vendorName } = props.match.params;
            return questions.length > 0 ? (
              <ReviewForm
                vendorUuid={vendorUuid}
                vendorName={vendorName}
                history={props.history}
              />
            ) : null;
          }
          return (
            <Redirect
              push
              to={{
                pathname: "/login",
                isRedirect: true
              }}
            />
          );
        }}
      />
    </Switch>
  );
};

export default Routes;
