import { Block } from '../../utils/Block';

const validationErrorTpl = `{{{title}}}`;

interface ValidationErrorProps{
  title: string;
  bottomError: string;
}

export class ValidationError extends Block {
  constructor(props: ValidationErrorProps) {
    super('h7', props);
  }

  _init() {
    this.element!.classList.add('validationError', 'displayNone', this.props.bottomError);
  }

  render(): string {
    return this.compile(validationErrorTpl, this.props);
  }
}
