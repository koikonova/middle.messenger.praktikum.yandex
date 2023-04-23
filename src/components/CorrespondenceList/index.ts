import { Block } from '../../utils/Block';
import {chat, Correspondence} from "../Correspondence";
import {store} from "../../utils/Store";
import {chatsController} from "../../controllers/ChatController";
import {ChatInfo} from "../../utils/Types";
import {withStore} from "../../utils/Store";

const correspondenceListTpl = `
{{{chat1}}}
{{{chat2}}}
{{{chat3}}}
{{{chat4}}}
`;

interface Chatlist {
  chats?: {
    data: ChatInfo[];
  };
}

export class CorrespondenceList extends Block<Chatlist> {
  constructor() {
    super('div' );
  }

  render(): string {
    if (this.props.chats == undefined){
    } else {
      console.log(this.props.chats);

      // this.children.chat1 = this.createChatsList();

      this.children.chat1 = new Correspondence({
        last_message: this.props.chats[0].last_message,
        title: this.props.chats[0].title,
        unread_count: this.props.chats[0].unread_count,
      });
      this.children.chat2 = new Correspondence({
        last_message: this.props.chats[1].last_message,
        title: this.props.chats[1].title,
        unread_count: this.props.chats[1].unread_count,
      });
      this.children.chat3 = new Correspondence({
        last_message: this.props.chats[2].last_message,
        title: this.props.chats[2].title,
        unread_count: this.props.chats[2].unread_count,
      });
      this.children.chat4 = new Correspondence({
        last_message: this.props.chats[3].last_message,
        title: this.props.chats[3].title,
        unread_count: this.props.chats[3].unread_count,
        events: {
          click: () => {
            chatsController.selectChat(this.props.chats[3].id)
          },
        },
      });

      // this.children.chats = this.props.chats.map(
      //   (chat: ChatInfo) => {
      //     return new Correspondence({
      //         last_message: chat.last_message,
      //         title: chat.title,
      //         unread_count: chat.unread_count,
      //       });
      //   },
      // );
    }

    return this.compile(correspondenceListTpl, this.props);
  }

  createChatsList(){
  //   return this.props.chats.map(
  //     (chat: ChatInfo) => {
  //       return new Correspondence({
  //         last_message: chat.last_message,
  //         title: chat.title,
  //         unread_count: chat.unread_count,
  //       });
  //     },
  //   );
  }
}

const withChats = withStore((state) => ({
  chats: { ...state.chats },
  // user: { ...state.user },
}));

export const ChatsList = withChats(CorrespondenceList)