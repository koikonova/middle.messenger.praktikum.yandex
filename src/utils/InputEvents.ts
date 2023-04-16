import Validation from "./Validation";
import authController from "../controllers/AuthController";

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

const formSubmit = (): void => {
  const inputValue: { [key: string]: any } = {};
  const inputList = document.querySelectorAll('input');

  inputList.forEach((input: HTMLInputElement) => {
    inputValue[input.name] = input.value;
  });

  console.log(inputValue);
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

export { focus, blur, formSubmit };
