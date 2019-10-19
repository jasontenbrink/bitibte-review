import React, { useEffect, Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { withRouter } from "react-router-dom";
import { dispatch } from "./store";
import VendorsList from "./VendorsList";
import Routes from "./Routes";
import TopNav from "./TopNav";
import MainNotification from "./MainNotification/";

import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import mockApis from "./apis/mockApis";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 475
  }
}));

function MainContent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [comment, setComment] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const user = useSelector(state => state.user);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper);

  useEffect(() => {
    dispatch.reviews.getReviewsAndSetSelected();
    // dispatch.questions.getQuestions();
  }, []);

  return (
    <Fragment>
      <TopNav />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <VendorsList />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MainNotification />
              <Paper className={fixedHeightPaper}>
                <Routes />
                <Grid style={{ marginTop: "20px" }} container justify="center">
                  <Button color="primary" onClick={() => setModalOpen(true)}>
                    Leave feedback about this page
                  </Button>
                </Grid>
                <Dialog
                  disableBackdropClick
                  keepMounted
                  fullWidth
                  maxWidth="sm"
                  aria-labelledby="confirmation-dialog-title"
                  open={modalOpen}
                >
                  <DialogTitle id="confirmation-dialog-title">
                    Tell us ow could this page be better
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      id="outlined-multiline-flexible"
                      fullWidth={true}
                      multiline
                      rows="4"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      className={null}
                      margin="normal"
                      variant="outlined"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={async () => {
                        try {
                          await mockApis.provideFeedback({
                            comment,
                            user,
                            page: window.location.href
                          });
                          setModalOpen(false);
                          setComment("");
                        } catch (e) {
                          dispatch.call.setCall({
                            isFetching: false,
                            error: e
                          });
                        }
                      }}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </Fragment>
  );
}

export default withRouter(MainContent);
