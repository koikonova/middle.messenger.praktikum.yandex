import './style.scss'
import {Block} from "../../utils/Block";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {AddChat} from "./addChat";
import {store, withStore} from "../../utils/Store";
import {router} from "../../utils/Router";
import {chatsController} from "../../controllers/ChatController";
import {chatList, ChatsList, CorrespondenceList} from "../../components/CorrespondenceList";
import {Correspondence} from "../../components/Correspondence";
import {User} from "../../utils/Types";
import {ChatHistory, chatHistory} from "../../components/ChatHistory";

const mainTpl = `
    {{{addChat}}}
    <div class="chats">
      <div class="chats--content">
        {{{profileButton}}}
        {{{search}}}
        <hr class="separatory-line">
        {{{chatList}}}
        {{{addButton}}}
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
        this.children.chatList = new ChatsList();
        this.children.chatHistory = new chatHistory();

        this.children.addChat = new AddChat({});
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

        this.children.addButton = new Button({
            buttonTitle: 'Добавить чат',
            buttonClassName: 'button',
            events: {
                click: (e) => {
                    this.addChat(e);
                }
            },
        });
    }

    addChat(event: Event){
        event.preventDefault();
        const addChat = document.querySelectorAll('.displayNone');
        addChat[0].classList.remove('displayNone');
        addChat[0].classList.add('addChatBoxBackground');
    }

    protected componentDidUpdate(_oldProps: User, newProps: User): boolean {
        // if (_oldProps){
        //     this.props = this.props
        // } else
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
