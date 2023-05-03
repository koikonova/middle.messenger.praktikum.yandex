import { Block } from '../../utils/Block';
import {correspondence} from "../Correspondence";
import {chatsController} from "../../controllers/ChatController";
import {ChatInfo, CorrespondenceProps} from "../../utils/Types";
import {withStore} from "../../utils/Store";
import {isEqual} from "../../utils/Helpers";

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

  _init() {
    if (this.props.chats == undefined){
    } else {
      this.children.chats = this.createChatsList(this.props.chats);
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
            chatsController.selectChat(props[chat].id)
              .then(() => {
                // console.log('props')
                // console.log(props[chat].id)
              })
            // this.chatHistory();
          }
        }
      });
    });
  }

  protected componentDidUpdate(_oldProps: Chatlist, newProps: Chatlist): boolean {
    if (_oldProps){
      // console.log('_oldProps')
      // console.log(_oldProps)
      this.children.chats = this.createChatsList(this.props.chats);
    } else
      if (newProps){
      // console.log('newProps')
      // console.log(newProps.chats)
      this.children.chats = this.createChatsList(newProps.chats);
      return true;
    }
  }

  render(): string {
    // if (this.props.chats == undefined){
    // } else {
    //   this.children.chats = this.createChatsList(this.props.chats);
    // }

    return this.compile(correspondenceListTpl, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: { ...state.chats }
}));

export const ChatsList = withChats(CorrespondenceList)