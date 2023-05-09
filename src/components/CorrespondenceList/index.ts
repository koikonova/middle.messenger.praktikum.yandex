import { Block } from '../../utils/Block';
import {correspondence} from "../Correspondence";
import {chatsController} from "../../controllers/ChatController";
import {ChatInfo} from "../../utils/Types";
import {withStore} from "../../utils/Store";
import {isEqual} from "../../utils/Helpers";
import {messagesController} from "../../controllers/MessageController";

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

  protected componentDidUpdate(_oldProps: Chatlist, newProps: Chatlist): boolean {
    if (_oldProps != undefined && !isEqual(_oldProps, newProps.chats)){
      const sumNewChats = Object.keys(newProps.chats).length - Object.keys(_oldProps).length;
      if (sumNewChats > 1){
        this.children.chats = this.createChatsList(newProps.chats);
        return true;
      } else {
        const props = newProps.chats[Object.keys(newProps.chats).length - 1];

        messagesController.connect(props.id, props.token)
          .then(() => {
            console.log(`чат ${props.id} подключен`);
          });

        this.children.chats = new correspondence({
          last_message: props.last_message,
          title: props.title,
          unread_count: props.unread_count,
          events: {
            click: (event: Event) => {
              event.preventDefault();
              chatsController.selectChat(props.id);
            }
          }
        });
        return true;
      }
    }
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
            // this.chatHistory();
          }
        }
      });
    });
  }

  render(): string {
    return this.compile(correspondenceListTpl, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: { ...state.chats }
}));

export const chatsList = withChats(CorrespondenceList)
