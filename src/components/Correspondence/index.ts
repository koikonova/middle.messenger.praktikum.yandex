import { Block } from '../../utils/Block';

const correspondenceTpl = `
  <div class="correspondence-info">
    <div class="correspondence-avatar"></div>
    <div class="user-info">
      <h4 class="user-login">{{title}}</h4>
      <h5 class="message-info">{{message}}</h5>
    </div>
    <div class="date-info">
      <p class="date">{{date}}</p>
      <div class="unread-messages">{{unread_count}}</div>
    </div>
  </div>
  <hr class="separatory-line">`;

interface CorrespondenceProps{
  id: number;
  title: string;
  unread_count: number;
  // selectedChat: ChatInfo;
  events: {
    click: () => void;
  }
}

export class Correspondence extends Block {
  constructor(props: CorrespondenceProps) {
    super('div', props);
  }

  render(): string {
    return this.compile(correspondenceTpl, this.props);
  }
}
