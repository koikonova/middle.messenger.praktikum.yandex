import { Block } from '../../utils/Block';
import {Input} from "../Input";
import {Button} from "../Button";
import {ReceivedMessage} from "../ReceivedMessageText";
import {ReceivedMessageImg} from "../ReceivedMessageImg";
import {SentMessage} from "../SentMessageText";
import {messagesController} from "../../controllers/MessageController";
import {store, withStore} from "../../utils/Store";
import {Message} from "../../utils/Types";
import {isEqual} from "../../utils/Helpers";


const chatHistoryTpl = `
   <div class="chat-info">
     <div class="chat-avatar"></div>
     <div class="buttons">
      {{{addButton}}}
      {{{deleteButton}}}
     </div>
     <hr class="separatory-line">
   </div>
   <div class="chat-history">
        {{{messages}}}
   </div>
   <div class="send-message-box">
       <hr class="separatory-line">
       {{{attachButton}}}
       <form action="send" class="send-message">
            <div class="message">
                {{{inputSendMessage}}}
            </div>
            {{{sendButton}}}
       </form>
   </div>`;

export interface chatHistoryProps {
  // selectedChat: number | undefined;
  messages: Message[];
  // userId: number;
}

export class ChatHistory extends Block {
  constructor(props: chatHistoryProps) {
    super('div', props);
  }

  _init() {
    // this.element!.classList.add('chat-box', 'displayNone');
    this.element!.classList.add('chat-box');

    this.children.addButton = new Button({
      buttonTitle: 'Добавить пользователя',
      buttonClassName: 'button',
      events: {
        click: (e) => {
          this.popUp(e,'.addId');
        }
      },
    });

    this.children.deleteButton = new Button({
      buttonTitle: 'Удалить пользователя',
      buttonClassName: 'button',
      events: {
        click: (e) => {
          this.popUp(e,'.deleteId');
        }
      },
    });
    // console.log(this.props)
    // this.children.messages = this.createMessages(this.props);

    this.children.attachButton = new Button({
      buttonClassName: 'attach',
      events: {
        click: () => {
          console.log('attach');
        }
      },
    });
    this.children.inputSendMessage = new Input({
      type: 'message',
      name: 'message',
      value: 'Сообщение',
    });
    this.children.sendButton = new Button({
      buttonClassName: 'send',
      buttonType: 'submit',
      events: {
        click: (e) => this.send(e)
      },
    });
  }

  popUp(event: Event, selector){
    event.preventDefault();
    const popUp = document.querySelector(selector);
    popUp.classList.remove('displayNone');
    popUp.classList.add('boxBackground');
  }

  getValue(selector) {
    return document.querySelector(selector).value;
  }

  send(event: Event){
    event.preventDefault();
    const message = this.getValue('#message');
    messagesController.sendMessage(store.getState().selectedChat, message)
  }

  createMessages(props: chatHistoryProps) {
    return props.messages.map((data) => new ReceivedMessage({
      content: data.content,
      // isMine: props.userId === data.user_id
    }))
  }

  unwrap(value) {
    if (value instanceof Object) {
      return value.valueOf();
    }
    return value;
  }

  protected componentDidUpdate(_oldProps: chatHistoryProps, newProps: chatHistoryProps): boolean {
    console.log('_oldProps')
    console.log(_oldProps)
    console.log('newProps')
    console.log(newProps)

    if (_oldProps != undefined && !isEqual(_oldProps, newProps.messages)){
      console.log(isEqual(_oldProps, newProps))
      this.children.messages = this.createMessages(newProps);
      return true;
    }
  }

  render(): string {
    return this.compile(chatHistoryTpl, this.props);
  }
}

// const withSelectedChatHistory = withStore((state) => {
//   const selectedChatId = state.selectedChat
//
//   if (!selectedChatId) {
//     return {
//       messages: [],
//       selectedChat: undefined,
//       userId: state.user.id,
//     }
//   }
//
//   return {
//     messages: (state.messages || {})[selectedChatId] || [],
//     selectedChat: state.selectedChat,
//     userId: state.user.id,
//   }
// })

const withSelectedChatHistory = withStore((state) => ({
    messages: (state.messages || {})[state.selectedChat] || [],
    // selectedChat: state.selectedChat,
    // userId: state.user.id,
}));

export const chatHistory = withSelectedChatHistory(ChatHistory)

