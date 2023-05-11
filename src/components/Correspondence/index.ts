import { Block } from '../../utils/Block';
import {CorrespondenceProps} from "../../utils/Types";
import {store, withStore} from "../../utils/Store";
import {Button} from "../Button";
import {chatsController} from "../../controllers/ChatController";

const correspondenceTpl = `
  <div class="correspondence-info">
    <div class="correspondence-avatar">
      {{{avatar}}}
<!--      <img class="chatListAvatar" src="{{avatar}}"/>-->
    </div>
    <div class="user-info">
      <h4 class="user-login">{{title}}</h4>
      <h5 class="message-info">{{last_message}}</h5>
    </div>
    <div class="date-info">
      <div class="unread-messages">{{unread_count}}</div>
      {{{deleteButton}}}
    </div>
  </div>
  <hr class="separatory-line">`;

export class Correspondence extends Block {
  constructor(props: CorrespondenceProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('chatHistory');
    this.element!.classList.add(this.props.classId);
    this.children.deleteButton = new Button({
      buttonTitle: 'x',
      buttonClassName: 'deleteChat',
      buttonClassNameSpecial: this.props.buttonClassNameSpecial,
      buttonClassDisplayNone: 'displayNone',
      buttonType: 'button',
      events: {
        click: () => {
          chatsController.delete(store.getState().selectedChat)
            .then(() => {
              console.log(`чат ${store.getState().selectedChat} удален`)
            })
            .catch((e) => {
              console.error(e);
            });
        }
      },
    })
  }

  protected componentDidUpdate(_oldProps: CorrespondenceProps, newProps: CorrespondenceProps): boolean {
    if (newProps){
        this.props = newProps;
      }
  }

  render(): string {
    return this.compile(correspondenceTpl, {
      ...this.props,
      avatar: this.props.avatar ? `<img class="chatListAvatar" src="https://ya-praktikum.tech/api/v2/resources${this.props.avatar}"/>` : '',
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
