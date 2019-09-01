import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import { initializeForm, updateForm } from "../components/formState";
import useStyles from "./forgotPasswordStyles";
import { dispatch } from "../store";

function ForgotPassword() {
  const classes = useStyles();

  const fields = ["email"];
  const [initialFormState, validators] = initializeForm(fields);
  const [formState, setFormState] = useState(initialFormState);
  const { values, errors, isFormValid } = formState;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();

            if (isFormValid) {
              dispatch.user.resetPassword(formState.values);
              setFormState(initialFormState);
            }
          }}
          noValidate
        >
          <Grid container spacing={2}>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            className={classes.submit}
          >
            Get new password
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                back to login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default ForgotPassword;
