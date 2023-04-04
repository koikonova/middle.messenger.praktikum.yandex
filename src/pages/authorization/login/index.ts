import './style.scss';
import {Block} from "../../../utils/Block";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";
import {formSubmit} from "../../../utils/InputEvents";

const loginTpl =
    ` <div class="login-box--content">
        <h2 class="title">Вход</h2>
        <form class="authorization">
            {{{login}}}
            {{{password}}}
            {{{formButton}}}
        </form>
        {{{link}}}
      </div>`;

export class Login extends Block{
    constructor(props) {
        super('main', props);
    }

    _init() {
        this.element!.classList.add('login-box');
        this.children.login = new LabelInput({
            name: 'login',
            type: 'text',
            labelTitle: 'Логин',
            labelInputClassName: 'labelInputLogin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.password = new LabelInput({
            name: 'password',
            type: 'password',
            labelTitle: 'Пароль',
            labelInputClassName: 'labelInputLogin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.formButton = new Button({
            buttonTitle: 'Войти',
            buttonClassName: 'button',
            buttonType: 'button',
            events: {
                click: formSubmit
            },
        });
        this.children.link = new Button({
            buttonTitle: 'Нет аккаунта?',
            buttonClassName: 'link',
            events: {
                click: () => {
                    console.log('/signin');
                }
            },
            buttonHref: '/signin',
        });
    }

    render(): string {
        return this.compile(loginTpl, this.props);
    }
}
