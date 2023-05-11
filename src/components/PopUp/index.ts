import { Block } from '../../utils/Block';
import {LabelInput} from "../LabelInput";
import {Button} from "../Button";
import {chatsController} from "../../controllers/ChatController";
import {store} from "../../utils/Store";

const popUpTpl = `
  <div class="popUpBox">
    {{{close}}}
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
}

export class PopUp extends Block {
  constructor(props: PopUpProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add(this.props.classBox, 'displayNone');
    this.children.close = new Button({
      buttonTitle: 'x',
      buttonClassName: 'close',
      buttonType: 'button',
      events: {
        click: () => {
          const addChat = document.querySelector('.boxBackground');
          addChat.classList.remove('boxBackground');
          addChat.classList.add('displayNone');
        }
      },
    })
    this.children.chatName = new LabelInput(this.props);
    if (this.props.classBox === 'addChat'){
      this.children.button = new Button({
        ...this.props,
        events: {
          click: (e) => this.createNewChat(e),
        }
      });
    }
    if (this.props.classBox === 'addId'){
      this.children.button = new Button({
        ...this.props,
        events: {
          click: (e) => this.addId(e),
        }
      });
    }
    if (this.props.classBox === 'deleteId'){
      this.children.button = new Button({
        ...this.props,
        events: {
          click: (e) => this.deleteId(e),
        }
      });
    }
  }

  sanitizeInput(input) {
    const scriptRegex = /<\s*[sS][^>]*>/;
    const linkRegex = /<a\b[^>]*>/gi;

    if (scriptRegex.test(input) || linkRegex.test(input)) {
      return false;
    } else {
      return true;
    }
  }

  getValue(selector) {
    return document.querySelector(selector).value;
  }

  createNewChat(event: Event) {
    event.preventDefault();
    const value = this.getValue('#chatName');
    if (value) {
      if (this.sanitizeInput(value)){
        chatsController.create(value)
          .catch((e) => {
            console.error(e);
          });
      }
    }
    const addChat = document.querySelector('.addChat');
    addChat.classList.remove('boxBackground');
    addChat.classList.add('displayNone');
  }

  addId(event: Event) {
    event.preventDefault();
    const value = this.getValue('#addId');
    if (value) {
      if (this.sanitizeInput(value)){
        const ID = [Number(value)]
        const selectedChat = store.getState().selectedChat
        chatsController.addUser(ID, selectedChat)
      }
    }
    const addChat = document.querySelector('.addId');
    addChat.classList.remove('boxBackground');
    addChat.classList.add('displayNone');
  }

  deleteId(event: Event) {
    event.preventDefault();
    const value = this.getValue('#deleteId');
    if (value) {
      if (this.sanitizeInput(value)){
        const ID = [Number(value)]
        const selectedChat = store.getState().selectedChat
        chatsController.deleteUser(ID, selectedChat)
          .then(() => {console.log('user delete')})
      }
    }
    const addChat = document.querySelector('.deleteId');
    addChat.classList.remove('boxBackground');
    addChat.classList.add('displayNone');
  }

  render(): string {
    return this.compile(popUpTpl, this.props);
  }
}
