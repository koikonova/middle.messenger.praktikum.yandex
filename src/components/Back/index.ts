import { Block } from '../../utils/Block';
import {Button} from "../Button";

const backTpl = `{{{buttonBack}}}`;

export class Back extends Block {
  constructor(props) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('back');
    this.children.buttonBack = new Button({
      buttonClassName: 'button-back',
      buttonEvents: {
        click: () => {
          console.log('/main');
        }
      },
      buttonHref: '/main',
    });
  }

  render(): string {
    return this.compile(backTpl, this.props);
  }
}
