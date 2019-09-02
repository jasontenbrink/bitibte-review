import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { initializeForm, updateForm } from "../components/formState";
import { dispatch } from "../store";
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

function SignIn({ history }) {
  const classes = useStyles();
  const call = useSelector(state => state.call);
  const user = useSelector(state => state.user);
  useEffect(() => {
    const { location, goBack, push } = history;
    const navFunc = location.isRedirect
      ? () => goBack()
      : () => push("/reviews");
    user.loggedIn && navFunc();
  }, [user.loggedIn, history]);

  const fields = ["email", "password"];
  const [initialFormState, validators] = initializeForm(fields);
  const [formState, setFormState] = useState(initialFormState);
  const { values, errors, isFormValid } = formState;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {call.error ? (
          <Typography color="error" align="center" className={classes.error}>
            {call.error}
          </Typography>
        ) : null}
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();

            if (isFormValid) {
              dispatch.user.login(formState.values);
              setFormState(initialFormState);
            }
          }}
          noValidate
        >
          <TextField
            value={values.email}
            onChange={e => updateForm(e, formState, setFormState, validators)}
            variant="outlined"
            margin="normal"
            required
            error={!!errors.email}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={values.password}
            error={!!errors.password}
            onChange={e => updateForm(e, formState, setFormState, validators)}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isFormValid}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <p>Reviews of software recruiting, staffing and consulting agencies</p>
    </Container>
  );
}

export default SignIn;
