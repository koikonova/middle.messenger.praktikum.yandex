import { Block } from '../../utils/Block';
import {Input} from "../Input";
import {Button} from "../Button";
import {ReceivedMessage} from "../ReceivedMessageText";
import {ReceivedMessageImg} from "../ReceivedMessageImg";
import {SentMessage} from "../SentMessageText";
import {messagesController, Message} from "../../controllers/MessageController";
import {store, withStore} from "../../utils/Store";


const chatHistoryTpl = `
   <div class="chat-info">
     <div class="chat-avatar"></div>
     <h4 class="chat-login">{{{chatLogin}}}</h4>
     {{{optionsButton}}}
     <hr class="separatory-line">
   </div>
   <div class="chat-history">
<!--     <h5 class="chat-date">{{{chatDate}}}</h5>-->
<!--      {{{receivedMessage}}}-->
<!--      {{{receivedMessageImg}}}-->
<!--      {{{sentMessage}}}-->
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

// interface chatHistoryProps{
//   chatDate: string;
//   chatLogin: string;
// }

interface chatHistoryProps {
  selectedChat: number | undefined;
  messages: Message[];
  userId: number;
}

export class ChatHistory extends Block {
  constructor(props: chatHistoryProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('chat-box', 'displayNone');

    this.children.optionsButton = new Button({
      buttonClassName: 'options',
      events: {
        click: () => {
          console.log('options');
        }
      },
    });
    // this.children.receivedMessage = new ReceivedMessage(this.props);
    // this.children.receivedMessageImg = new ReceivedMessageImg(this.props);
    // this.children.sentMessage = new SentMessage(this.props);
    this.children.messages = this.createMessages(this.props)
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
      buttonType: 'button',
      events: {
        click: () => this.send()
      },
    });
  }

  getValue(selector) {
    return document.querySelector(selector).value;
  }

  send(){
    const message = this.getValue('#message');
    messagesController.sendMessage(this.props.selectedChat, message)
    console.log(message)
    console.log(this.props.selectedChat)
  }

  protected componentDidUpdate(_oldProps: chatHistoryProps, newProps: chatHistoryProps): boolean {
    if (_oldProps){
      this.children.messages =this.children.messages;
    } else {
      this.children.messages = this.createMessages(newProps)
      return true
    }
  }

  private createMessages(props: chatHistoryProps) {
    console.log('createMess')
    console.log(props)
    return props.messages.map((data) => new ReceivedMessage({ ...data, isMine: props.userId === data.user_id }))
  }

  render(): string {
    return this.compile(chatHistoryTpl, this.props);
  }
}

const withSelectedChatHistory = withStore((state) => {
  const selectedChatId = state.selectedChat

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    }
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  }
})

export const chatHistory = withSelectedChatHistory(ChatHistory)
