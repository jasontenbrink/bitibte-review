import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { initializeForm, updateForm } from "../components/formState";
import useStyles from "./styles";
import { dispatch } from "../store";

function Registration({ history }) {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  useEffect(() => {
    const { location, goBack, push } = history;
    const navFunc = location.isRedirect
      ? () => goBack()
      : () => push("/reviews");
    user.loggedIn && navFunc();
  }, [user.loggedIn, history]); // history included for eslint

  const fields = ["firstName", "lastName", "email", "password"];
  const [initialFormState, validators] = initializeForm(fields);
  const [formState, setFormState] = useState(initialFormState);
  const { values, errors, isFormValid } = formState;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();

            if (isFormValid) {
              dispatch.user.register(formState.values);
              setFormState(initialFormState);
            }
          }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.firstName}
                onChange={e =>
                  updateForm(e, formState, setFormState, validators)
                }
                error={!!errors.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.lastName}
                onChange={e =>
                  updateForm(e, formState, setFormState, validators)
                }
                error={!!errors.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.email}
                onChange={e =>
                  updateForm(e, formState, setFormState, validators)
                }
                error={!!errors.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.password}
                onChange={e =>
                  updateForm(e, formState, setFormState, validators)
                }
                error={!!errors.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Registration;
