import { Block } from '../../utils/Block';

const buttonTpl = `{{buttonTitle}}`;

interface ButtonProps{
  buttonTitle?: string;
  buttonClassName: string;
  buttonClassNameSpecial?: string;
  buttonType?: string;
  events: { click: () => void; };
  buttonHref?: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  _init() {
    if (this.props.buttonClassNameSpecial){
      this.element!.classList.add(this.props.buttonClassName, this.props.buttonClassNameSpecial);
    } else {
      this.element!.classList.add(this.props.buttonClassName);
    }
    if(this.props.buttonHref){
      this.element!.setAttribute('onClick', `location.href='${this.props.buttonHref}'`);
    }
    if(this.props.buttonType){
      this.element!.setAttribute('type', this.props.buttonType);
    }
  }

  render(): string {
    return this.compile(buttonTpl, this.props);
  }
}
