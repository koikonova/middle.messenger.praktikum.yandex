import './style.scss'
import {Block} from "../../utils/Block";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {PopUp} from "../../components/PopUp";
import {store} from "../../utils/Store";
import {router} from "../../utils/Router";
import {chatsController} from "../../controllers/ChatController";
import {chatsList} from "../../components/CorrespondenceList";
import {chatHistory} from "../../components/ChatHistory";
import {messagesController} from "../../controllers/MessageController";

const mainTpl = `
    {{{addChat}}}
    {{{addId}}}
    {{{deleteId}}}
    <div class="chats">
      <div class="chats--content">
        {{{profileButton}}}
        {{{search}}}
        <hr class="separatory-line">
        {{{chatList}}}
        {{{addChatButton}}}
      </div>
    </div>
    <div class="chat-box">
        <div class="chat-info">
            <div class="chat-avatar"></div>
                <div class="buttons">
                    {{{addButton}}}
                    {{{deleteButton}}}
                </div>
            <hr class="separatory-line">
        </div>
        <div class="chat-history">
          {{{chatHistory}}}
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
        </div>
    </div>
`;

export class Main extends Block {
    constructor() {
        super('main' );
    }

    _init() {
        chatsController.fetchChats()
          .then(() => {
              Object.keys(store.getState().chats).map((chat) => {
                  messagesController.connect(store.getState().chats[chat].id, store.getState().chats[chat].token)
                    .then(() => {
                        console.log(`чат ${store.getState().chats[chat].id} подключен`);
                    });
              });
          });

        this.children.chatList = new chatsList();
        this.children.chatHistory = new chatHistory();

        this.children.addChat = new PopUp({
            classBox: 'addChat',
            name: 'chatName',
            type: 'text',
            className: 'chatName',
            labelInputClassName: 'labelInputPopUp',
            labelTitle: 'Название чата',
            buttonTitle: 'Добавить',
            buttonClassName: 'button',
            buttonClassNameSpecial: 'popUpButton',
            buttonType: 'submit',
        });
        this.children.addId = new PopUp({
            classBox: 'addId',
            name: 'addId',
            type: 'text',
            className: 'addId',
            labelInputClassName: 'labelInputPopUp',
            labelTitle: 'ID пользователя',
            buttonTitle: 'Добавить',
            buttonClassName: 'button',
            buttonClassNameSpecial: 'popUpButton',
            buttonType: 'submit',
        });
        this.children.deleteId = new PopUp({
            classBox: 'deleteId',
            name: 'deleteId',
            type: 'text',
            className: 'deleteId',
            labelInputClassName: 'labelInputPopUp',
            labelTitle: 'ID пользователя',
            buttonTitle: 'Удалить',
            buttonClassName: 'button',
            buttonClassNameSpecial: 'popUpButton',
            buttonType: 'submit',
        });

        this.children.profileButton = new Button({
            buttonTitle: 'Профиль >',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'link-profile',
            events: {
                click: () => {
                    router.go('/settings')
                }
            },
        });
        this.children.search = new Input({
            name: 'search',
            type: 'search',
            placeholder: 'Поиск',
            className: 'search',
        });
        this.children.addChatButton = new Button({
            buttonTitle: 'Добавить чат',
            buttonClassName: 'button',
            events: {
                click: (e) => {
                    this.popUp(e,'.addChat');
                }
            },
        });

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

    getValue(selector) {
        return document.querySelector(selector).value;
    }

    send(event: Event){
        event.preventDefault();
        const message = this.getValue('#message');
        messagesController.sendMessage(store.getState().selectedChat, message.textContent)
    }

    popUp(event: Event, selector){
        event.preventDefault();
        const popUp = document.querySelector(selector);
        popUp.classList.remove('displayNone');
        popUp.classList.add('boxBackground');
    }

    render(): string {
        return this.compile(mainTpl, this.props);
    }
}
