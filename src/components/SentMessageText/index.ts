import { Block } from '../../utils/Block';

const sentMessageTpl = `
   <h5 class="sent-message">{{{sentMessage}}}</h5>
   <div class="sent-message-time-box">
      <div class="delivery"></div>
      <h7 class="message-time">{{{sentMessageDate}}}</h7>
   </div>
`;

interface SentMessageProps{
  sentMessage: string;
  sentMessageDate: string;
}

export class SentMessage extends Block {
  constructor(props: SentMessageProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('sent-message-box');
  }

  render() {
    return this.compile(sentMessageTpl, this.props);
  }
}
