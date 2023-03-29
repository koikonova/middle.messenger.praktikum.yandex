import { Block } from '../../utils/Block';
import {Input} from "../Input";
import {Button} from "../Button";
import {ReceivedMessage} from "../ReceivedMessageText";
import {ReceivedMessageImg} from "../ReceivedMessageImg";
import {SentMessage} from "../SentMessageText";


const chatHistoryTpl = `
   <div class="chat-info">
     <div class="chat-avatar"></div>
     <h4 class="chat-login">{{{chatLogin}}}</h4>
     {{{optionsButton}}}
     <hr class="separatory-line">
   </div>
   <div class="chat-history">
     <h5 class="chat-date">{{{chatDate}}}</h5>
      {{{receivedMessage}}}
      {{{receivedMessageImg}}}
      {{{sentMessage}}}
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

interface chatHistoryProps{
  chatDate: string;
  chatLogin: string;
}

export class ChatHistory extends Block {
  constructor(props: chatHistoryProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('chat-box');
    this.children.optionsButton = new Button({
      buttonClassName: 'options',
      buttonEvents: {
        click: () => {
          console.log('options');
        }
      },
    });
    this.children.receivedMessage = new ReceivedMessage(this.props);
    this.children.receivedMessageImg = new ReceivedMessageImg(this.props);
    this.children.sentMessage = new SentMessage(this.props);
    this.children.attachButton = new Button({
      buttonClassName: 'attach',
      buttonEvents: {
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
      buttonEvents: {
        click: () => {
          console.log('send');
        }
      },
    });
  }

  render(): string {
    return this.compile(chatHistoryTpl, this.props);
  }
}
