export const checkInputValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.isRequired) {
    isValid = value.trim() !== "";
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const getEmailValidationRules = () => {
  return {
    isRequired: true,
    isEmail: true,
    validationMessage: "Please enter valid email format!"
  };
};

export const getPasswordValidationRules = () => {
  return {
    isRequired: true,
    minLength: 6,
    validationMessage: "Password must be at least 6 charachters long!"
  };
};
