import React from "react";
import { connect, useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import ReviewForm from "../ReviewForm";
import Review from "../Review";
import Login from "../Login";
import Typography from "@material-ui/core/Typography";

const Routes = () => {
  const reviews = useSelector(state => state.reviews);
  const questions = useSelector(state => state.questions);
  const user = useSelector(state => state.user);

  return (
    <Switch>
      <Route path="/" exact component={Review} />
      <Route path="/login" component={Login} />
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
