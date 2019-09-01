import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { initializeForm, updateForm } from "../components/formState";
import useStyles from "./SuggestVendorStyles";
import { dispatch } from "../store";
import Divider from "@material-ui/core/Divider";

function SuggestVendor() {
  const classes = useStyles();

  const requiredFields = ["name", "city", "state"];
  const [initialRequiredFormState, requiredValidators] = initializeForm(
    requiredFields
  );
  const [requiredformState, setRequiredFormState] = useState(
    initialRequiredFormState
  );
  const { values, errors, isFormValid } = requiredformState;

  const optionalFields = ["addressLine1", "addressLine2", "zipCode", "phone"];
  const [initialOptionalFormState, optionalValidators] = initializeForm(
    optionalFields
  );
  const [optionalformState, setOptionalFormState] = useState(
    initialOptionalFormState
  );

  const handleOptionalChange = e =>
    updateForm(e, optionalformState, setOptionalFormState, optionalValidators);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Are we missing a vendor?
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();

            if (isFormValid) {
              dispatch.vendor.suggestVendor({
                ...requiredformState.values,
                ...optionalformState.values
              });
              setRequiredFormState(initialRequiredFormState);
              setOptionalFormState(initialOptionalFormState);
            }
          }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={values.name}
                onChange={e =>
                  updateForm(
                    e,
                    requiredformState,
                    setRequiredFormState,
                    requiredValidators
                  )
                }
                error={!!errors.name}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Company Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.city}
                onChange={e =>
                  updateForm(
                    e,
                    requiredformState,
                    setRequiredFormState,
                    requiredValidators
                  )
                }
                error={!!errors.city}
                variant="outlined"
                required
                fullWidth
                name="city"
                label="City"
                type="city"
                id="city"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.state}
                onChange={e =>
                  updateForm(
                    e,
                    requiredformState,
                    setRequiredFormState,
                    requiredValidators
                  )
                }
                error={!!errors.state}
                variant="outlined"
                required
                fullWidth
                name="state"
                label="State"
                type="state"
                id="state"
              />
            </Grid>
            <Divider />
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <TextField
                value={optionalformState.values.addressLine1}
                onChange={handleOptionalChange}
                error={!!optionalformState.errors.addressLine1}
                variant="outlined"
                fullWidth
                id="addressLine1"
                label="Address Line 1"
                name="addressLine1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={optionalformState.values.addressLine2}
                onChange={handleOptionalChange}
                error={!!optionalformState.errors.addressLine2}
                variant="outlined"
                fullWidth
                id="addressLine2"
                label="Address Line 2"
                name="addressLine2"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={optionalformState.values.zipCode}
                onChange={handleOptionalChange}
                error={!!optionalformState.errors.zipCode}
                variant="outlined"
                fullWidth
                name="zipCode"
                label="Zip Code"
                type="zipCode"
                id="zipCode"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={optionalformState.values.phone}
                onChange={handleOptionalChange}
                error={!!optionalformState.errors.phone}
                variant="outlined"
                fullWidth
                name="phone"
                label="Phone Number"
                type="phone"
                id="phone"
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
            name="submitSuggestVendor"
          >
            Suggest This Vendor
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SuggestVendor;
