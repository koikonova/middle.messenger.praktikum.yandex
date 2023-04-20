import './style.scss'
import {Block} from "../../utils/Block";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {AddChat} from "./addChat";
import {withStore} from "../../utils/Store";
import {router} from "../../utils/Router";
import {CorrespondenceList} from "../../components/CorrespondenceList";

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

        this.children.CorrespondenceList = new CorrespondenceList({...this.props});
        // this.children.correspondence1 = new Correspondence({
        //     name: 'Илья',
        //     message: 'Друзья, у меня для вас особенный выпуск новостей!...',
        //     date: '15:12',
        //     unread: '2',
        // });
        // this.children.correspondence2 = new Correspondence({
        //     name: 'тет-а-теты',
        //     message: 'И Human Interface Guidelines и Material Design рекомендуют...',
        //     date: 'Ср',
        //     unread: '4',
        // });
        // this.children.chatHistory = new ChatHistory({
        //     chatLogin: 'Вадим',
        //     chatDate: '19 июня',
        //     receivedMessage:'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
        //       '<br>\n' +
        //       '<br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        //     receivedMessageDate: '11:56',
        //     receivedMessageImgDate: '11:56',
        //     sentMessage: 'Круто!',
        //     sentMessageDate: '12:00',
        // });
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