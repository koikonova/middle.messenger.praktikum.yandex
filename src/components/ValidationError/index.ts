import { Block } from '../../utils/Block';

const validationErrorTpl = `{{{title}}}`;

interface ValidationErrorProps{
  title: string;
}

export class ValidationError extends Block {
  constructor(props: ValidationErrorProps) {
    super('h7', props);
  }

  _init() {
    this.element!.classList.add('validationError', 'displayNone');

  }

  render(): string {
    return this.compile(validationErrorTpl, this.props);
  }
}
