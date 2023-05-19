import { Block } from '../../utils/Block';
import {Input, InputProps} from "../Input";
import {Label, LabelProps} from "../Label";
import {ValidationError} from "../ValidationError";
import {blur, focus} from "../../utils/InputEvents";

const labelInputTpl = `
  {{{label}}}
  {{{input}}}
  {{{validationError}}}
`;

export interface LabelInputProps extends InputProps, LabelProps{
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
      ...this.props,
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

  render() {
    return this.compile(labelInputTpl, this.props);
  }
}
