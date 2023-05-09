import { Block } from '../../utils/Block';
import {CorrespondenceProps} from "../../utils/Types";
import {withStore} from "../../utils/Store";

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

  protected componentDidUpdate(_oldProps: CorrespondenceProps, newProps: CorrespondenceProps): boolean {
    if (newProps){
        this.props = newProps;
      }
  }

  render(): string {
    return this.compile(correspondenceTpl, {
      last_message: this.props.last_message ? 'Тут должна быть сообщенька' : 'Нет сообщений',
      title: this.props.title,
      unread_count: this.props.unread_count,
      isSelected: this.props.id === this.props.selectedChat?.id,
    });
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || [])
    .find(({ id }) => id === state.selectedChat),
}));

export const correspondence = withSelectedChat(Correspondence);
