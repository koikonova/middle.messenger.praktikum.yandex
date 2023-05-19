import { Block } from '../../utils/Block';
import {Button} from "../Button";
import {router} from "../../utils/Router";

const backTpl = `{{{buttonBack}}}`;

export class Back extends Block {
  constructor(props: Record<string, any> = {}) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('back');
    this.children.buttonBack = new Button({
      buttonClassName: 'button-back',
      events: {
        click: () => {
          router.go('/messenger')
        }
      }
    });
  }

  render() {
    return this.compile(backTpl, this.props);
  }
}
