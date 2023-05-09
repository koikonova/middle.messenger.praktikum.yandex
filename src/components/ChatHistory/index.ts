import { Block } from '../../utils/Block';
import {ReceivedMessage} from "../ReceivedMessageText";
import {withStore} from "../../utils/Store";
import {Message} from "../../utils/Types";
import {isEqual} from "../../utils/Helpers";


const chatHistoryTpl = `{{{messages}}}`;

export interface chatHistoryProps {
  messages: Message[];
}

export class ChatHistory extends Block {
  constructor(props: chatHistoryProps) {
    super('div', props);
  }

  protected componentDidUpdate(_oldProps: chatHistoryProps, newProps: chatHistoryProps): boolean {
    if (_oldProps != undefined && !isEqual(_oldProps, newProps.messages)){
      const messages = document.querySelectorAll('.received-message-text-box');
      if (messages != 0) {
        for (let i = -1; i < messages.length; i++){
          if (messages[i] != undefined){
            messages[i].remove();
          }
        }
      }
      this.children.messages = this.createMessages(newProps);
      return true;
    }
  }

  createMessages(props: chatHistoryProps) {
    return props.messages.map((data) => new ReceivedMessage({
      content: data.content,
    }))
  }

  render(): string {
    return this.compile(chatHistoryTpl, this.props);
  }
}

const withSelectedChatHistory = withStore((state) => ({
    messages: (state.messages || {})[state.selectedChat] || [],
}));

export const chatHistory = withSelectedChatHistory(ChatHistory)
