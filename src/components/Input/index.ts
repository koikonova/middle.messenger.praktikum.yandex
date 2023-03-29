import { Block } from "../../utils/Block";

const inputTpl = '';

interface InputProps{
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  className?: string;
  events?: {
    focus: (event: Event) => void;
    blur: (event: Event) => void };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', props);
  }

  _init() {
    this.element!.setAttribute('id', this.props.name);
    this.element!.setAttribute('type', this.props.type);
    this.element!.setAttribute('name', this.props.name);
    if (this.props.placeholder){
      this.element!.setAttribute('placeholder', this.props.placeholder);
    }
    if (this.props.value){
      this.element!.setAttribute('value', this.props.value);
    }
    if (this.props.className){
      this.element!.classList.add(this.props.className);
    }
  }

  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render(): string {
    return this.compile(inputTpl, this.props);
  }
}
