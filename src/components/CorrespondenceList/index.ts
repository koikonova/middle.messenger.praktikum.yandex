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

  componentDidUpdate(_oldProps: any, newProps: any): any {
    if (_oldProps != undefined && !isEqual(_oldProps, newProps.chats)){
      if (newProps.chats !== undefined){
        const sumNewChats = Object.keys(newProps.chats).length - Object.keys(_oldProps).length;
        if (sumNewChats > 1){
          //@ts-ignore
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
          //@ts-ignore
          this.children.chats = this.createChatsList(newProps.chats);
          return true;
        } else {
          //@ts-ignore
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
  }

  changeBg(props: number){
    const chat: HTMLDivElement | null = document.querySelector(`.classId${props}`);
    const chats = document.querySelectorAll('.chatHistory');
    if (chats)
      for (let i = -1; i < chats.length; i++){
        if (chats[i] != undefined){
          chats[i].classList.remove('correspondence-info-bg');
        }
      }
    if (chat !== null){
      chat.classList.add('correspondence-info-bg');
    }

    const button: HTMLButtonElement | null = document.querySelector(`.classButton${props}`);
    const buttons = document.querySelectorAll('.deleteChat');
    if (buttons)
      for (let i = -1; i < chats.length; i++){
        if (buttons[i] != undefined){
          buttons[i].classList.add('displayNone');
        }
      }
    if (button !== null){
      button.classList.remove('displayNone');
    }
  }

  chatHistory(){
    const chat: HTMLDivElement | null = document.querySelector('.chat-box');
    if (chat !== null){
      chat.classList.remove('displayNone');
      chat.classList.add('displayFlex');
    }
  }

  createChatsList(props: any) {
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

  render() {
    return this.compile(correspondenceListTpl, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: { ...state.chats }
}));

export const chatsList = withChats(CorrespondenceList)
