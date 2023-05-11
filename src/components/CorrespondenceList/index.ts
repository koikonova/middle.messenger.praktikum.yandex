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
      } else if (sumNewChats === -1){
        const chats = document.querySelectorAll('.chatHistory');
        if (chats)
        for (let i = -1; i < chats.length; i++){
          if (chats[i] != undefined){
            chats[i].remove();
          }
        }
        this.children.chats = this.createChatsList(newProps.chats);
        return true;
      } else {
        const props = newProps.chats[Object.keys(newProps.chats).length - 1];

        messagesController.connect(props.id, props.token)
          .then(() => {
            console.log(`чат ${props.id} подключен`);
          });

        this.children.chats = new correspondence({
          ...props,
          classId: `classId${props.id}`,
          buttonClassNameSpecial: `classButton${props.id}`,
          events: {
            click: (event: Event) => {
              event.preventDefault();

              chatsController.selectChat(props.id)
                .then(() => {
                  this.chatHistory();
                  this.changeBg(props.id);
                })
                .catch((e) => {
                  console.error(e);
                });
            }
          }
        });
        return true;
      }
    }
  }

  changeBg(props){
    const chat = document.querySelector(`.classId${props}`);
    const chats = document.querySelectorAll('.chatHistory');
    if (chats)
      for (let i = -1; i < chats.length; i++){
        if (chats[i] != undefined){
          chats[i].classList.remove('correspondence-info-bg');
        }
      }
    chat.classList.add('correspondence-info-bg');

    const button = document.querySelector(`.classButton${props}`);
    const buttons = document.querySelectorAll('.deleteChat');
    if (buttons)
      for (let i = -1; i < chats.length; i++){
        if (buttons[i] != undefined){
          buttons[i].classList.add('displayNone');
        }
      }
    button.classList.remove('displayNone');
  }

  chatHistory(){
    const chat = document.querySelector('.chat-box');
    chat.classList.remove('displayNone');
    chat.classList.add('displayFlex');
  }

  createChatsList(props) {
    return Object.keys(props).map((chat) => {
      return new correspondence({
        ...props[chat],
        classId: `classId${props[chat].id}`,
        buttonClassNameSpecial: `classButton${props[chat].id}`,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            chatsController.selectChat(props[chat].id)
              .then(() => {
                this.chatHistory();
                this.changeBg(props[chat].id);
              })
              .catch((e) => {
                console.error(e);
              });
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
