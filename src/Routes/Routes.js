import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import ReviewForm from "../ReviewForm";
import Review from "../Review";
import Login from "../Login";
import Registration from "../Registration";
import ForgotPassword from "../ForgotPassword";
import Profile from "../Profile";
import SuggestVendor from "../SuggestVendor";
import UserReviews from "../UserReviews";
import EditReview from "../EditReview";
import Home from "../Home";

const Routes = () => {
  const questions = useSelector(state => state.questions);
  const user = useSelector(state => state.user);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/reviews" exact component={Review} />
      <Route path="/login" component={Login} />
      <Route path="/suggest-vendor" component={SuggestVendor} />
      <Route path="/your-reviews" component={UserReviews} />
      <Route path="/registration" component={Registration} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/profile" component={Profile} />
      <Route path="/edit-review/:reviewId" component={EditReview} />
      <Route
        path="/review-form/:vendorId/:vendorName"
        render={props => {
          if (user.loggedIn) {
            const { vendorId, vendorName } = props.match.params;
            return (
              <ReviewForm
                vendorId={vendorId}
                vendorName={vendorName}
                history={props.history}
              />
            );
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
