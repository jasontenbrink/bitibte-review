import React from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

const StyledButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
    "&:hover": {
      backgroundColor: indigo[700]
    }
  }
}))(Button);

function TopNavButton(props) {
  return (
    <StyledButton
      color="primary"
      variant="text"
      onClick={() => props.history.push(props.to)}
    >
      {props.children}
    </StyledButton>
  );
}

export default withRouter(TopNavButton);
