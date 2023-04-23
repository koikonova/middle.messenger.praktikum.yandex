import { Block } from '../../utils/Block';
import {ChatInfo} from "../../utils/Types";
import {withStore} from "../../utils/Store";
import {ProfileInfo} from "../../pages/profile/profileInfo";

const correspondenceTpl = `
  <div class="correspondence-info">
    <div class="correspondence-avatar"></div>
    <div class="user-info">
      <h4 class="user-login">{{title}}</h4>
      <h5 class="message-info">{{last_message}}</h5>
    </div>
    <div class="date-info">
<!--      <p class="date">{{date}}</p>-->
      <div class="unread-messages">{{unread_count}}</div>
    </div>
  </div>
  <hr class="separatory-line">`;

interface CorrespondenceProps{
  last_message: number;
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
    return this.compile(correspondenceTpl, {
      last_message: this.props.last_message,
      title: this.props.title,
      unread_count: this.props.unread_count,
      // isSelected: this.props.id === this.props.selectedChat?.id,
    });
  }
}
//
// export const withSelectedChat = withStore((state) => ({
//   selectedChat: state.chats
//     .find(({ id }) => id === state.selectedChat),
// }))
//
// export const chat = withSelectedChat(Correspondence)