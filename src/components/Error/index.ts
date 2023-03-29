import { Block } from '../../utils/Block';
import {Button} from "../Button";

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
      buttonTitle: 'Назад к чатам',
      buttonClassName: 'link',
      buttonClassNameSpecial: 'error-link',
      buttonEvents: {
        click: () => {
          console.log('/main');
        }
      },
      buttonHref: '/main',
    });
  }

  render(): string {
    return this.compile(errorTpl, this.props);
  }
}
