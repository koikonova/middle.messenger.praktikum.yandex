import { Block } from '../../utils/Block';
import {correspondence} from "../Correspondence";
import {chatsController} from "../../controllers/ChatController";
import {ChatInfo, CorrespondenceProps} from "../../utils/Types";
import {withStore} from "../../utils/Store";

const correspondenceListTpl = `{{{chats}}}`;

interface Chatlist {
  chats?: {
    data: ChatInfo[];
  };
}

export class CorrespondenceList extends Block<Chatlist> {
  constructor() {
    super('div' );
  }

  protected componentDidUpdate(_oldProps: CorrespondenceProps, newProps: CorrespondenceProps): boolean {
    if (_oldProps){
      this.children.chats = this.children.chats;
    } else {
      this.children.chats = this.createChatsList(newProps);
      return true;
    }
  }

  render(): string {
    if (this.props.chats == undefined){
    } else {
      this.children.chats = this.createChatsList(this.props.chats);
    }

    return this.compile(correspondenceListTpl, this.props);
  }

  chatHistory(){
    const chat = document.querySelector('.chat-box');
    chat.classList.remove('displayNone');
  }

  createChatsList(props) {
    return Object.keys(props).map((chat) => {
      return new correspondence({
        last_message: props[chat].last_message,
        title: props[chat].title,
        unread_count: props[chat].unread_count,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            chatsController.selectChat(props[chat].id);
            this.chatHistory();
          }
        }
      });
    });
  }
}

const withChats = withStore((state) => ({
  chats: { ...state.chats }
}));

export const ChatsList = withChats(CorrespondenceList)