export function initializeForm(fields, customValidators = {}) {
  const values = {};
  const errors = {};
  const validators = {};

  fields.forEach(field => {
    values[field] = "";
    errors[field] = "";
    if (customValidators[field]) {
      validators[field] = customValidators[field];
    } else {
      validators[field] = value => (value === "" ? `${field} is required` : "");
    }
  });
  return [{ values, errors, isFormValid: false }, validators];
}

function checkValidity(formState, requiredFieldsLength) {
  const { values, errors } = formState;
  const hasAllRequiredFields =
    Object.keys(values).filter(value => values[value]).length ===
    requiredFieldsLength;
  const hasErrors = !!Object.keys(errors).filter(error => errors[error]).length;

  return hasAllRequiredFields && !hasErrors;
}

export function updateForm(e, formState, setFormState, validators) {
  const field = e.target.name;
  const value = e.target.value;
  const validator = validators[field];

  const newFormState = {
    ...formState,
    values: {
      ...formState.values,
      [field]: value
    },
    errors: {
      ...formState.errors,
      [field]: validator(value)
    }
  };

  const isFormValid = checkValidity(
    newFormState,
    Object.keys(validators).length
  );
  setFormState({ ...newFormState, isFormValid });
}
