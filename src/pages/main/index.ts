import './style.scss'
import {Block} from "../../utils/Block";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {AddChat} from "./addChat";
import {withStore} from "../../utils/Store";
import {router} from "../../utils/Router";
import {ChatsList, CorrespondenceList} from "../../components/CorrespondenceList";

const mainTpl = `
    {{{addChat}}}
    <div class="chats">
      <div class="chats--content">
        {{{profileButton}}}
        {{{search}}}
        <hr class="separatory-line">
        {{{CorrespondenceList}}}
        {{{addButton}}}
      </div>
    </div>
    {{{chatHistory}}}
`;

export class Main extends Block {
    constructor(props) {
        super('main', props);
    }

    _init() {
        console.log(this.props);
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

        this.children.CorrespondenceList = new ChatsList();

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

    render(): string {
        return this.compile(mainTpl, this.props);
    }
}

const withUser = withStore((state) => ({ ...state.user }));

export const MainPage = withUser(Main);