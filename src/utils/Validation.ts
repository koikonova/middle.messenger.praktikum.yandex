class Validation {
  private static LabelInput: Record<
    string,
    {
      pattern: RegExp;
      errorMessage: string;
    }
  > = {
    login: {
      pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
      errorMessage: 'Некорректный логин',
    },
    email: {
      pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
      errorMessage: 'Некорректный email',
    },
    password: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Некорректный пароль',
    },
    repeatPassword: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Некорректный пароль',
    },
    oldPassword: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Некорректный пароль',
    },
    repeatNewPassword: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Некорректный пароль',
    },
    newPassword: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Некорректный пароль',
    },
    first_name: {
      pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
      errorMessage: 'Некорректное имя',
    },
    second_name: {
      pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
      errorMessage: 'Некорректная фамилия',
    },
    display_name: {
      pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
      errorMessage: 'Некорректное имя',
    },
    phone: {
      pattern: /^[+-d]?\d{10,15}$/,
      errorMessage: 'Некорректный номер телефона',
    },
  };

  static validate(inputName: string, inputValue: string) {
    const result: {
      verify: boolean;
      message: string;
    } = {
      verify: true,
      message: '',
    };

    const pattern = Validation.LabelInput[inputName].pattern;

    if (!pattern.test(inputValue)) {
      result.verify = false;
      result.message = Validation.LabelInput[inputName].errorMessage;
    }

    return result;
  }
}

export default Validation;
