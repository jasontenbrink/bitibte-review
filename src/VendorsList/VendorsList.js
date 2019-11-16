import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { dispatch } from "../store";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MakeStars from "../components/MakeStars";
import { withRouter } from "react-router-dom";

function calcAverageStars(review) {
  const sum = review.questions.reduce((total, question) => {
    return (total += question);
  }, 0);
  console.log(sum, review.questions.length);
  return sum / review.questions.length;
}

function VendorsList({ reviews, history }) {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: { fontSize: "16pt" } }}
          primary="Vendors"
        />
      </ListItem>
      {reviews.map(review => (
        <React.Fragment key={review.vendorId}>
          <Divider />
          <ListItem
            button
            onClick={() => {
              dispatch.selectedReview.setSelectedReview(review.vendorId);
              history.push("/reviews");
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "space-between",
                alignContent: "center",
                flexDirection: "column"
              }}
            >
              <div>
                <ListItemText
                  style={{ marginLeft: "10px" }}
                  primary={review.name}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {MakeStars(calcAverageStars(review))}
              </div>
            </div>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}

const mapStateToProps = state => ({
  reviews: state.reviews
});
export default connect(mapStateToProps)(withRouter(VendorsList));
