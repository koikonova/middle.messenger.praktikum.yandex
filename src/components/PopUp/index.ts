import { Block } from '../../utils/Block';
import {LabelInput, LabelInputProps} from "../LabelInput";
import {Button, ButtonProps} from "../Button";
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
//@ts-ignore
interface PopUpProps extends LabelInputProps, ButtonProps{
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
          const addChat: HTMLDivElement | null = document.querySelector('.boxBackground');
          if (addChat !== null){
            addChat.classList.remove('boxBackground');
            addChat.classList.add('displayNone'); 
          }
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

  sanitizeInput(input: any) {
    const scriptRegex = /<\s*[sS][^>]*>/;
    const linkRegex = /<a\b[^>]*>/gi;

    if (scriptRegex.test(input) || linkRegex.test(input)) {
      return false;
    } else {
      return true;
    }
  }

  getValue(selector: any) {
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
    const addChat: HTMLDivElement | null = document.querySelector('.addChat');
    if (addChat !== null){
      addChat.classList.remove('boxBackground');
      addChat.classList.add('displayNone');
    }
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
    const addChat: HTMLDivElement | null = document.querySelector('.addId');
    if (addChat !== null){
      addChat.classList.remove('boxBackground');
      addChat.classList.add('displayNone');
    }
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
    const addChat: HTMLDivElement | null = document.querySelector('.deleteId');
    if (addChat !== null){
      addChat.classList.remove('boxBackground');
      addChat.classList.add('displayNone');
    }
  }

  render() {
    return this.compile(popUpTpl, this.props);
  }
}
