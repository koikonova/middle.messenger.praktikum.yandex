import { Block } from '../../utils/Block';
import {CorrespondenceProps} from "../../utils/Types";

const correspondenceTpl = `
  <div class="correspondence-info">
    <div class="correspondence-avatar"></div>
    <div class="user-info">
      <h4 class="user-login">{{title}}</h4>
      <h5 class="message-info">{{last_message}}</h5>
    </div>
    <div class="date-info">
      <div class="unread-messages">{{unread_count}}</div>
    </div>
  </div>
  <hr class="separatory-line">`;

export class Correspondence extends Block {
  constructor(props: CorrespondenceProps) {
    super('div', props);
  }

  render(): string {
    return this.compile(correspondenceTpl, {
      last_message: this.props.last_message ? this.props.last_message : 'Нет сообщений',
      title: this.props.title,
      unread_count: this.props.unread_count,
    });
  }
}