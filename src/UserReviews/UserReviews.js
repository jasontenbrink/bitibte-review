import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./userReviewsStyles";
import { useSelector } from "react-redux";
import makeStars from "../components/MakeStars";
import { dispatch } from "../store";

function calcAverageStars(review) {
  const sum = review.questions.reduce((total, question) => {
    return (total += question);
  }, 0);
  return sum / review.questions.length;
}

function UserReviews({ history }) {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {user.firstName}'s Reviews
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {user.reviews.map(review => (
              <Grid item key={review.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardHeader
                    title={review.name}
                    subheader={makeStars(calcAverageStars(review))}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    className={classes.cardHeader}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography>{review.comment} </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container justify="flex-end">
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          dispatch.user.deleteReview(review.id);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          history.push(`/edit-review/${review.id}`);
                          //navigate to edit review page
                        }}
                      >
                        Edit
                      </Button>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default UserReviews;
