import { Block } from '../../utils/Block';

const receivedMessageImgTpl = `
   <h7 class="message-time">
    {{{receivedMessageImgDate}}}
   </h7>
`;

interface ReceivedMessageImgProps{
  receivedMessageImgDate: string;
}

export class ReceivedMessageImg extends Block {
  constructor(props: ReceivedMessageImgProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('received-message-img-box');
  }

  render() {
    return this.compile(receivedMessageImgTpl, this.props);
  }
}
