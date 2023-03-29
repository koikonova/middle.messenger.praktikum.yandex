import './style.scss';
import {Block} from "../../../utils/Block";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";
import {submit} from "../../../utils/InputEvents";

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
            labelInputClassName: 'labelInput',
        });
        this.children.password = new LabelInput({
            name: 'password',
            type: 'password',
            labelTitle: 'Пароль',
            labelInputClassName: 'labelInput',
        });
        this.children.formButton = new Button({
            buttonTitle: 'Войти',
            buttonClassName: 'button',
            buttonType: 'submit',
            buttonEvents: {
                click: submit,
            },
        });
        this.children.link = new Button({
            buttonTitle: 'Нет аккаунта?',
            buttonClassName: 'link',
            buttonEvents: {
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
