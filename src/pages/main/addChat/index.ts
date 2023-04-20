import './style.scss';
import { Block } from '../../../utils/Block';
import {LabelInput} from "../../../components/LabelInput";
import {Button} from "../../../components/Button";
import {chatsController} from "../../../controllers/ChatController";

const addChatTpl = `
  <div class="addChatBox">
    <h3 class="addChatText">Введите данные</h3>
    <form class="addChat">
      {{{chatName}}}
      {{{addId}}}
      {{{button}}}
    </form>
  </div>
`;

export class AddChat extends Block {
  constructor(props) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('displayNone');
    this.element!.classList.remove('addChatBoxBackground');
    this.children.chatName = new LabelInput({
      name: 'chatName',
      type: 'text',
      className: 'chatName',
      labelInputClassName: 'labelInputChatName',
      labelTitle: 'Введите название чата',
    });
    this.children.addId = new LabelInput({
      name: 'addId',
      type: 'text',
      className: 'addId',
      labelInputClassName: 'labelInputAddId',
      labelTitle: 'Добавить пользователя (введите ID)',
    });
    this.children.button = new Button({
      buttonTitle: 'Добавить',
      buttonClassName: 'button',
      buttonClassNameSpecial: 'addChatButton',
      buttonType: 'button',
      events: {
        click: () => this.createNewChat(),
      }
    });
  }

  getValue(selector) {
    return document.querySelector(selector).value;
  }

  createNewChat() {
    this.props.createChatMode = !this.props.createChatMode;
    const chatName = this.getValue('#chatName');
    // const addId = this.getValue('#addId');
    if (chatName) {
      chatsController.create(chatName)
      .then(() => {
        this.props.createChatMode = false
      }).catch((e) => {
        console.error(e)
      })
    }

  const addChat = document.querySelectorAll('.addChatBoxBackground');
  addChat[0].classList.remove('addChatBoxBackground');
  addChat[0].classList.add('displayNone');
  }

  render(): string {
    return this.compile(addChatTpl, this.props);
  }
}
