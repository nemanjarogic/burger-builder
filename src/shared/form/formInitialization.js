const defaultInputValidation = {
  isRequired: true,
  validationMessage: "Please enter a value!"
};

export const initInputProperty = (
  elementType,
  placeholder,
  validation = defaultInputValidation
) => {
  return {
    elementType: "input",
    elementConfig: {
      type: elementType,
      placeholder: placeholder
    },
    value: "",
    validation: validation,
    isValid: false,
    isModifiedByUser: false
  };
};

export const initSelectProperty = selectOptions => {
  const options = selectOptions.map(item => {
    return {
      value: item,
      displayValue: item.charAt(0).toUpperCase() + item.slice(1)
    };
  });

  return {
    elementType: "select",
    elementConfig: {
      options
    },
    value: options[0].value,
    validation: {},
    isValid: true
  };
};
