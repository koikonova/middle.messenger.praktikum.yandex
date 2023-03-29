import './style.scss';
import {Block} from "../../../utils/Block";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";

const loginTpl =
  ` <div class="signin-box--content">
        <h2 class="title">Регистрация</h2>
        <form class="authorization">
            {{{email}}}
            {{{login}}}
            {{{first_name}}}
            {{{second_name}}}
            {{{phone}}}
            {{{password}}}
            {{{repeatPassword}}}
            {{{formButton}}}
        </form>
        {{{link}}}
      </div>`;

export class Signin extends Block{
    constructor(props) {
        super('main', props);
    }

    _init() {
        this.element!.classList.add('signin-box');
        this.children.email = new LabelInput({
            name: 'email',
            type: 'email',
            labelTitle: 'Почта',
            labelInputClassName: 'labelInput',
        });
        this.children.login = new LabelInput({
            name: 'login',
            type: 'text',
            labelTitle: 'Логин',
            labelInputClassName: 'labelInput',
        });
        this.children.first_name = new LabelInput({
            name: 'first_name',
            type: 'text',
            labelTitle: 'Имя',
            labelInputClassName: 'labelInput',
        });
        this.children.second_name = new LabelInput({
            name: 'second_name',
            type: 'text',
            labelTitle: 'Фамилия',
            labelInputClassName: 'labelInput',
        });
        this.children.phone = new LabelInput({
            name: 'phone',
            type: 'tel',
            labelTitle: 'Телефон',
            labelInputClassName: 'labelInput',
        });
        this.children.password = new LabelInput({
            name: 'password',
            type: 'password',
            labelTitle: 'Пароль',
            labelInputClassName: 'labelInput',
        });
        this.children.repeatPassword = new LabelInput({
            name: 'repeatPassword',
            type: 'password',
            labelTitle: 'Пароль (ещё раз)',
            labelInputClassName: 'labelInput',
        });
        this.children.formButton = new Button({
            buttonTitle: 'Зарегистрироваться',
            buttonClassName: 'button',
            buttonType: 'submit',
            buttonEvents: {
                click: () => {
                    console.log('/main');
                }
            },
        });
        this.children.link = new Button({
            buttonTitle: 'Войти',
            buttonClassName: 'link',
            buttonEvents: {
                click: () => {
                    console.log('/');
                }
            },
            buttonHref: '/',
        });
    }

    render(): string {
        return this.compile(loginTpl, this.props);
    }
}
