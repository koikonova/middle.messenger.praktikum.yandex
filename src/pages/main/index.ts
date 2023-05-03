import './style.scss'
import {Block} from "../../utils/Block";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {PopUp} from "../../components/PopUp";
import {store, withStore} from "../../utils/Store";
import {router} from "../../utils/Router";
import {chatsController} from "../../controllers/ChatController";
import {ChatsList} from "../../components/CorrespondenceList";
import {chatHistory} from "../../components/ChatHistory";

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
    {{{chatHistory}}}
`;

export class Main extends Block {
    constructor() {
        super('main' );
    }

    _init() {
        chatsController.fetchChats();

        this.children.chatHistory = new chatHistory(this.props);
        this.children.chatList = new ChatsList();

        this.children.addChat = new PopUp({
            updateChatsList: this.updateChatsList.bind(this),

            classBox: 'addChat',
            name: 'chatName',
            type: 'text',
            className: 'chatName',
            labelInputClassName: 'labelInputPopUp',
            labelTitle: 'Название чата',
            buttonTitle: 'Добавить',
            buttonClassName: 'button',
            buttonClassNameSpecial: 'popUpButton',
            buttonType: 'button',
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
            buttonType: 'button',
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
            buttonType: 'button',
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
    }

    updateChatsList() {
        this.children.chatList.setProps({...this.props});
    }

    popUp(event: Event, selector){
        event.preventDefault();
        const popUp = document.querySelector(selector);
        popUp.classList.remove('displayNone');
        popUp.classList.add('boxBackground');
    }

    componentDidUpdate(_oldProps, newProps): boolean {
        if (newProps){
            this.props = newProps;
        }
    }

    render(): string {
        return this.compile(mainTpl, this.props);
    }
}

const withMain = withStore((state) => ({
    chats: { ...state.chats },
    user: { ...state.user },
}));

export const MainPage = withMain(Main);
