import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {". Built with "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

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
  }
}));

function initializeForm(fields, customValidators) {
  const values = {};
  const errors = {};
  const validators = {};

  fields.forEach(field => {
    values[field] = "";
    errors[field] = "";
    if (customValidators[field]) {
      validators[field] = customValidators[field];
    } else {
      validators[field] = value => (value === "" ? "" : `${field} is required`);
    }
  });
  return [{values, errors, isFormValid: false}, validators];
}

export default function SignIn() {
  const classes = useStyles();

  const fields = ["email", "password"];
  [initialFormState, validators] = initializeForm(
    fields,
    validatorsArray
  );
  [(formState, setFormState)] = useState(initialFormErrors);
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();
            console.log("hi mom");
          }}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
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
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
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

function formStateFactory(fields, validators) {
  const errors = {};
  const values = {};
  fields.forEach(field => {
    errors[field] = "";
    values[field] = "";
  });
  return {
    errors,
    values,
    isValid: false,
    update(field, value) {
      return {
        values: { ...values, [field]: value },
        errors: { ...errors, [field]: validators[field](value) || "" },
        isValid: this.checkValidity()
      };
    },
    checkValidity() {
      const populatedValues = Object.keys(this.values).filter(field => {
        return (this.values[field] && values[field] !== "").length;
      });
      const hasAllRequiredFields =
        populatedValues.length === Object.keys(validators).length;

      const hasErrors = Object.keys(this.errors).filter(field => {
        return errors[field !== ""];
      }).length;

      return hasAllRequiredFields && !hasErrors;
    }
  };
}

function checkValidity() {
  const hasAllRequiredFields = null; //figure out if all required fields have values
  const hasErrors = null; // look at the errors object to see if any fields have errors
}
