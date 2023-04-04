import './style.scss';
import {Block} from "../../../utils/Block";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";
import {formSubmit} from "../../../utils/InputEvents";

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
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.login = new LabelInput({
            name: 'login',
            type: 'text',
            labelTitle: 'Логин',
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.first_name = new LabelInput({
            name: 'first_name',
            type: 'text',
            labelTitle: 'Имя',
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.second_name = new LabelInput({
            name: 'second_name',
            type: 'text',
            labelTitle: 'Фамилия',
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.phone = new LabelInput({
            name: 'phone',
            type: 'tel',
            labelTitle: 'Телефон',
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.password = new LabelInput({
            name: 'password',
            type: 'password',
            labelTitle: 'Пароль',
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.repeatPassword = new LabelInput({
            name: 'repeatPassword',
            type: 'password',
            labelTitle: 'Пароль (ещё раз)',
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.formButton = new Button({
            buttonTitle: 'Зарегистрироваться',
            buttonClassName: 'button',
            buttonType: 'button',
            events: {
                click: formSubmit
            },
        });
        this.children.link = new Button({
            buttonTitle: 'Войти',
            buttonClassName: 'link',
            events: {
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
