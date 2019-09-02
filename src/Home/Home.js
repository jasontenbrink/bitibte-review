import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      // backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 440
  },
  title: {
    fontSize: "32pt",
    fontWeight: "lighter"
  },
  word: { margin: theme.spacing(0, 10, 5, 0) },
  text: {
    letterSpacing: "2px",
    fontFamily: "Letter Gothic",
    margin: theme.spacing(0, 10, 5, 0)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    marginTop: theme.spacing(2)
  }
}));

function Home() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography className={classes.title} component="p" variant="h5">
          Bit-Byte Review
        </Typography>
        <div style={{ marginTop: "30px" }}>
          <Grid container justify="flex-start">
            <Typography className={classes.text}>
              Reviews of software recruiting, staffing and consulting agencies
            </Typography>
          </Grid>
          <Grid container justify="flex-start">
            <Typography className={classes.text}>
              Software Developers leave reviews, which are aggregated and
              presented to the community
            </Typography>
          </Grid>
          {/* <Grid container justify="flex-start">
            <Typography className={classes.word}>Who</Typography>
            <Typography className={classes.text}>
              We are software developers that wanted a better way to share our
              experiences and help excellent recruiters stand out.
            </Typography>
          </Grid> */}
        </div>
      </div>
    </Container>
  );
}

export default Home;
