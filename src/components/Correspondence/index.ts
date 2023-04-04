import { Block } from '../../utils/Block';

const correspondenceTpl = `
  <div class="correspondence-info">
    <div class="correspondence-avatar"></div>
    <div class="user-info">
      <h4 class="user-login">{{name}}</h4>
      <h5 class="message-info">{{message}}</h5>
    </div>
    <div class="date-info">
      <p class="date">{{date}}</p>
      <div class="unread-messages">{{unread}}</div>
    </div>
  </div>
  <hr class="separatory-line">`;

interface CorrespondenceProps{
  name: string;
  message: string;
  date: string;
  unread: string;
}

export class Correspondence extends Block {
  constructor(props: CorrespondenceProps) {
    super('div', props);
  }

  render(): string {
    return this.compile(correspondenceTpl, this.props);
  }
}
