import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { dispatch } from "../store";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MakeStars from "../components/MakeStars";

function calcAverageStars(review) {
  const sum = review.questions.reduce((total, question) => {
    return (total += question.stars);
  }, 0);
  return sum / review.questions.length;
}

function VendorsList({ reviews }) {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Vendors" />
      </ListItem>
      {reviews.map(review => (
        <React.Fragment key={review.uuid}>
          <Divider />
          <ListItem
            button
            onClick={
              //call setSelected review
              () => dispatch.selectedReview.setSelectedReview(review.uuid)
            }
          >
            <ListItemText
              style={{ marginLeft: "10px" }}
              primary={review.name}
            />
            {MakeStars(calcAverageStars(review))}
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}

const mapStateToProps = state => ({
  reviews: state.reviews
});
export default connect(mapStateToProps)(VendorsList);
