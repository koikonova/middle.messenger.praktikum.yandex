import { Block } from '../../utils/Block';
import {LabelInput} from "../LabelInput";
import {Button} from "../Button";
import {chatsController} from "../../controllers/ChatController";
import {store} from "../../utils/Store";

const popUpTpl = `
  <div class="popUpBox">
    <h3 class="popUpText">Введите данные</h3>
    <form class="popUpForm">
      {{{chatName}}}
      {{{addId}}}
      {{{button}}}
    </form>
  </div>
`;

interface PopUpProps{
  classBox: string;
  updateChatsList: () => void;
}

export class PopUp extends Block {
  constructor(props: PopUpProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add(this.props.classBox, 'displayNone');
    this.children.chatName = new LabelInput(this.props);
    if (this.props.classBox === 'addChat'){
      this.children.button = new Button({
        ...this.props,
        events: {
          click: () => this.createNewChat(),
        }
      });
    }
    if (this.props.classBox === 'addId'){
      this.children.button = new Button({
        ...this.props,
        events: {
          click: () => this.addId(),
        }
      });
    }
    if (this.props.classBox === 'deleteId'){
      this.children.button = new Button({
        ...this.props,
        events: {
          click: () => this.deleteId(),
        }
      });
    }
  }

  getValue(selector) {
    return document.querySelector(selector).value;
  }

  createNewChat() {
    const value = this.getValue('#chatName');
    if (value) {
      chatsController.create(value)
        .then(() => {
          this.props.updateChatsList();
        })
        .catch((e) => {
          console.error(e);
        });
    }
    const addChat = document.querySelector('.addChat');
    addChat.classList.remove('boxBackground');
    addChat.classList.add('displayNone');
  }

  addId() {
    const value = this.getValue('#addId');
    if (value) {
      const ID = [Number(value)]
      const selectedChat = store.getState().selectedChat
      chatsController.addUser(ID, selectedChat)
    }
    const addChat = document.querySelector('.addId');
    addChat.classList.remove('boxBackground');
    addChat.classList.add('displayNone');
  }

  deleteId() {
    const value = this.getValue('#deleteId');
    if (value) {
      const ID = [Number(value)]
      const selectedChat = store.getState().selectedChat
      chatsController.deleteUser(ID, selectedChat)
        .then(() => {console.log('user delete')})
    }
    const addChat = document.querySelector('.deleteId');
    addChat.classList.remove('boxBackground');
    addChat.classList.add('displayNone');
  }

  render(): string {
    return this.compile(popUpTpl, this.props);
  }
}
