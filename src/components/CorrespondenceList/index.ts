import { Block } from '../../utils/Block';
import {correspondence} from "../Correspondence";
import {chatsController} from "../../controllers/ChatController";
import {ChatInfo} from "../../utils/Types";
import {store, withStore} from "../../utils/Store";
// import {isEqual} from "../../utils/Helpers";
// import {messagesController} from "../../controllers/MessageController";
// import {store} from "../../utils/Store";

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

  chatHistory(){
    const chat = document.querySelector('.chat-box');
    chat.classList.remove('displayNone');
  }

  createChatsList(props) {
   return Object.keys(props).map((chat) => {
      // console.log(chat)
      return new correspondence({
        last_message: props[chat].last_message,
        title: props[chat].title,
        unread_count: props[chat].unread_count,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            chatsController.selectChat(props[chat].id)
              .then(() => {
                console.log('props[chat].id')
                console.log(props[chat].id)
              })
            // this.chatHistory();
          }
        }
      });
    });
  }

  protected componentDidUpdate(_oldProps: Chatlist, newProps: Chatlist): boolean {
    this.children.chats = this.createChatsList(newProps.chats);
    return true;
  }

  render(): string {
   return this.compile(correspondenceListTpl, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: [...(state.chats || [])]
}));

export const ChatsList = withChats(CorrespondenceList)

