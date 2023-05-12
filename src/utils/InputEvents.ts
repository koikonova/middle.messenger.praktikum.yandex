import Validation from "./Validation";

const errorText = (input: HTMLElement) => {
  return input.closest('.labelInput')?.querySelector('.validationError');
};

const toggleInputError = (
  input: HTMLInputElement,
  result: {
    verify: boolean;
    message: string;
  },
): void => {
  const errorElement = errorText(input);

  if (!result.verify && errorElement) {
    errorElement.textContent = result.message;
    errorElement?.classList.remove('displayNone');
  } else {
    errorElement?.classList.add('displayNone');
  }
};

const focus = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const errorElement = errorText(input);
  errorElement?.classList.add('displayNone');
};

const blur = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const result = Validation.validate(input.name, input.value);

  toggleInputError(input, result);
};

export { focus, blur};
