import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";

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
    fontWeight: "lighter",
    letterSpacing: "1px"
  },
  word: { margin: theme.spacing(0, 10, 5, 0) },
  text: {
    letterSpacing: "2px",
    fontFamily: "Letter Gothic"
    // margin: theme.spacing(0, 10, 5, 0)
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
const style = {
  letterSpacing: "1px",
  fontWeight: "lighter",
  marginTop: "30px",
  width: "100%",
  textAlign: "center"
  // marginLeft: "50px"
};
const buttonStyle = {
  letterSpacing: "1px",
  marginTop: "55px",
  width: "15rem",
  fontWeight: "bolder"
};
function Home({ history }) {
  const classes = useStyles();

  const review = useSelector(state => state.reviews[0]);
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography className={classes.title} component="p" variant="h5">
          BitByte Review
        </Typography>{" "}
        <Grid container justify="flex-start">
          {/* <div style={{ marginTop: "30px" }}> */}
          {/* <Grid container justify="flex-start"> */}
          {/* <Typography style={{ ...style, marginTop: "60px" }}>
            Reviews of software recruiting, staffing and consulting agencies in
            the Twin Cities.
          </Typography> */}
          {/* </Grid> */}
          {/* <Grid container justify="flex-start"> */}
          {/* <Typography style={style}>
            Software Developers leave reviews, which are aggregated and
            presented to the community.
          </Typography> */}
          {/* <Typography style={style}>
            A simple way for software developers to elevate those with
            exceptional honesty, integrity and skill in serving our community.
          </Typography> */}
          <Typography style={style}>
            Software professionals elevating the best recruiting, consulting,
            and staffing agencies in the Twin Cities
          </Typography>
          <Grid container justify="center">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={buttonStyle}
              onClick={() => {
                history.push("/reviews");
              }}
            >
              Read Reviews
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ ...buttonStyle, marginLeft: "2rem" }}
              onClick={() => {
                history.push(`review-form/${review.vendorId}/${review.name}`);
              }}
            >
              Write Reviews
            </Button>
          </Grid>
          {/* </Grid> */}
          {/* <Grid container justify="flex-start">
            <Typography className={classes.word}>Who</Typography>
            <Typography className={classes.text}>
              We are software developers that wanted a better way to share our
              experiences and help excellent recruiters stand out.
            </Typography>
          </Grid> */}
          {/* </div> */}
        </Grid>
      </div>
    </Container>
  );
}

export default Home;
