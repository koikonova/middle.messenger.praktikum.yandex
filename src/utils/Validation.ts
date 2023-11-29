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
      errorMessage: 'Invalid login',
    },
    email: {
      pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
      errorMessage: 'Invalid email',
    },
    password: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Invalid password',
    },
    repeatPassword: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Invalid password',
    },
    oldPassword: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Invalid password',
    },
    repeatNewPassword: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Invalid password',
    },
    newPassword: {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Invalid password',
    },
    first_name: {
      pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
      errorMessage: 'Invalid first name',
    },
    second_name: {
      pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
      errorMessage: 'Invalid second name',
    },
    display_name: {
      pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
      errorMessage: 'Invalid display name',
    },
    phone: {
      pattern: /^[+-d]?\d{10,15}$/,
      errorMessage: 'Invalid phone',
    },
    chatName: {
      pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
      errorMessage: 'Invalid name',
    },
    addId: {
      pattern: /^\d+$/,
      errorMessage: 'Invalid ID',
    },
    deleteId: {
      pattern: /^\d+$/,
      errorMessage: 'Invalid ID',
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
