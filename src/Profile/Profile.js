import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { initializeForm, updateForm } from "../components/formState";
import useStyles from "./profileStyles";
import { dispatch } from "../store";

function Profile() {
  const classes = useStyles();

  const fields = ["oldPassword", "newPassword", "newPasswordConfirm"];
  const customValidators = {
    newPasswordConfirm: (value, formState) =>
      value !== formState.values.newPassword
  };
  const [initialFormState, validators] = initializeForm(
    fields,
    customValidators
  );
  const [formState, setFormState] = useState(initialFormState);
  const { values, errors, isFormValid } = formState;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();

            if (isFormValid) {
              dispatch.user.changePassword(formState.values);
              setFormState(initialFormState);
            }
          }}
          noValidate
        >
          <TextField
            value={values.oldPassword}
            onChange={e => updateForm(e, formState, setFormState, validators)}
            error={!!errors.oldPassword}
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="oldPassword"
            label="Password"
            name="oldPassword"
          />
          <TextField
            value={values.newPassword}
            onChange={e => updateForm(e, formState, setFormState, validators)}
            error={!!errors.newPassword}
            variant="outlined"
            required
            margin="normal"
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
          />
          <TextField
            value={values.newPasswordConfirm}
            onChange={e => updateForm(e, formState, setFormState, validators)}
            error={!!errors.newPasswordConfirm}
            variant="outlined"
            required
            margin="normal"
            fullWidth
            id="newPasswordConfirm"
            label="Confirm New Password"
            name="newPasswordConfirm"
          />

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
        </form>
      </div>
    </Container>
  );
}

export default Profile;
