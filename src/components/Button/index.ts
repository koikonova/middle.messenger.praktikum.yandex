import { Block } from '../../utils/Block';

const buttonTpl = `{{buttonTitle}}`;

export interface ButtonProps{
  buttonTitle?: string;
  buttonClassName: string;
  buttonClassNameSpecial?: string;
  buttonClassDisplayNone?: string;
  buttonType?: string;
  events: {
    // eslint-disable-next-line no-unused-vars
    click: (event: Event) => void; 
  };
  buttonHref?: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  _init() {
    this.element!.addEventListener('click', this.props.events.click)

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
    if (this.props.buttonClassDisplayNone){
      this.element!.classList.add(this.props.buttonClassDisplayNone);
    }
  }

  render() {
    return this.compile(buttonTpl, this.props);
  }
}
