import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MainContent from "./MainContent";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <MainContent />
        </Router>
      </Provider>
    </div>
  );
}
