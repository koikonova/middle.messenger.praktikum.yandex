import { Block } from '../../utils/Block';
import {Button} from "../Button";
import {router} from "../../utils/Router";

const errorTpl = `
    <h1 class="error">{{error}}</h1>
    <h2 class="error-title">{{title}}</h2>
    {{{errorBack}}}
`;

interface ErrorProps{
  error: string;
  title: string;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super('main', props);
  }

  _init() {
    this.element!.classList.add('error-content');
    this.children.errorBack = new Button({
      buttonTitle: 'Back to chats',
      buttonClassName: 'link',
      buttonClassNameSpecial: 'error-link',
      events: {
        click: () => {
          router.go('/messenger');
        }
      }
    });
  }

  render() {
    return this.compile(errorTpl, this.props);
  }
}
