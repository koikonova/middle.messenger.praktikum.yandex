import { Block } from '../../utils/Block';
import {Input} from "../Input";
import {Label} from "../Label";
import {ValidationError} from "../ValidationError";
import {blur, focus} from "../../utils/InputEvents";

const labelInputTpl = `
  {{{label}}}
  {{{input}}}
  {{{validationError}}}
`;

interface LabelInputProps{
  name: string;
  error: string;
  labelInputClassName: string;
}

export class LabelInput extends Block {
  constructor(props: LabelInputProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('labelInput', this.props.labelInputClassName);
    this.children.label = new Label(this.props);
    this.children.input = new Input({
      name: this.props.name,
      type: this.props.type,
      placeholder: this.props.placeholder,
      value: this.props.value,
      className: this.props.className,
      events: {
        focus: focus,
        blur: blur,
      },
    });
    this.children.validationError = new ValidationError(this.props);
  }

  render(): string {
    return this.compile(labelInputTpl, this.props);
  }
}
